import {
  Action,
  Command,
  Ctx,
  Hears,
  Help,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { buttons, buttonsLine } from './bot.buttons';
import { BotService } from './bot.service';
import {
  ADD,
  INFO,
  NOT_A_NUMBER,
  SKILLS,
  STOP,
} from './constants/answers.constatns';
import { buttonName } from './constants/button.constants';
import { listMarkup } from './helpers/list-markup.pelpers';
import { Context } from './interfaces/ctx.interface';
import { Item } from './interfaces/item.interface';

const { list, add, skills, stop } = buttonName;

const list1: Item[] = [
  {
    date: new Date().toLocaleDateString(),
    amount: 20,
    name: 'Первый',
    symbols: 2345,
  },
  {
    date: new Date().toLocaleDateString(),
    amount: 43,
    name: 'Второй',
    symbols: 2345,
  },
];

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botServise: BotService,
  ) {}

  @Start()
  async start(ctx: Context) {
    await ctx.reply(`Привет ${ctx.message.from.first_name}✌️`, buttons());
    await ctx.setMyCommands([
      { command: '/start', description: 'Запуск бота' },
      { command: '/help', description: 'Помощь' },
      { command: '/info', description: 'Информация о боте' },
    ]);
    const rows = await this.botServise.getAllRows()
    console.log('sheet', rows[0].name)
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @Command('info')
  async info(@Ctx() ctx: Context) {
    await ctx.reply(INFO);
  }

  @Hears(list.name)
  async getList(ctx: Context) {
    const rows = await this.botServise.getAllRows();
    await ctx.replyWithHTML(listMarkup(rows));
  }

  @Hears(add.name)
  async add(ctx: Context) {
    await ctx.replyWithHTML(ADD);
    ctx.session.type = 'add';
  }

  @Hears(skills.name)
  async skills(ctx: Context) {
    await ctx.reply(SKILLS);
  }

  @Hears(stop.name)
  async stop(ctx: Context) {
    await ctx.reply(STOP);
    // this.bot.stop()
  }

  @Hears('test-2')
  async test3(ctx: Context) {
    console.log('\n\nctx 1', ctx);
    await ctx.reply('Test 2', buttonsLine());
  }

  @On('text')
  async foo(@Ctx() ctx: Context, @Message('text') text: string) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'add') {
      const [coefficient, symbolCount, name] = text.split('-');

      console.log('text', text.split('-'));
      if (isNaN(Number(symbolCount.trim())) || isNaN(Number(coefficient.trim()))) {
        await ctx.reply(NOT_A_NUMBER);
        return;
      }

      const date = new Date().toLocaleDateString();
      const item: Item = {
        amount: Number(coefficient.trim()),
        date,
        name: name.trim(),
        symbols: Number(symbolCount.trim()),
      };

      await this.botServise.addItem(item)
      const rows = await this.botServise.getAllRows()
      // list1.push(entity);
      await ctx.reply('Проверь добавление ⬇️');
      await ctx.replyWithHTML(listMarkup(rows));
      ctx.session.type = null;
    }
  }

  @Command('/test')
  async on(ctx: Context) {
    console.log('ctx', ctx);
    await ctx.reply('👍');
    // this.bot.stop()
  }
}
