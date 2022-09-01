import {
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
import { buttons } from './bot.buttons';
import { BotService } from './bot.service';
import { ADD, INFO, NOT_A_NUMBER } from './constants/answers.constatns';
import { buttonName } from './constants/button.constants';
import { Context } from './interfaces/ctx.interface';
import { Item } from './interfaces/item.interface';

const { add } = buttonName;

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botServiсe: BotService,
  ) {}

  @Start()
  async start(ctx: Context) {
    await ctx.setMyCommands([
      { command: '/start', description: 'Запуск бота' },
      { command: '/help', description: 'Помощь' },
      { command: '/info', description: 'Информация о боте' },
    ]);
    await fetch('https://iren-bot.herokuapp.com/', { method: 'GET' });
    await ctx.reply(`Привет ${ctx.message.from.first_name}✌️`, buttons());
    return;
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Ни чем помочь не могу 😊');
    return;
  }

  @Command('info')
  async info(@Ctx() ctx: Context) {
    await ctx.reply(INFO);
    return;
  }

  @Hears(add.name)
  async add(ctx: Context) {
    ctx.session.type = 'add';
    await ctx.replyWithHTML(ADD);
    return;
  }

  @On('text')
  async foo(@Ctx() ctx: Context, @Message('text') text: string) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'add') {
      const [coefficient, symbolCount, name] = text.split('-');

      console.log('text', text.split('-'));
      if (
        isNaN(Number(symbolCount.trim())) ||
        isNaN(Number(coefficient.trim()))
      ) {
        await ctx.reply(NOT_A_NUMBER);
        return;
      }

      const date = new Date().toLocaleDateString();
      const item: Item = {
        amount: Number(coefficient.trim()),
        date,
        name: name.trim(),
        symbols: Number(symbolCount.trim()),
        sum: (Number(symbolCount.trim()) / 1000) * Number(coefficient.trim()),
      };

      const addSum = await this.botServiсe.addItem(item);
      ctx.session.type = null;
      await ctx.reply(`Добавлено! 👍\n\nСумма ${Math.floor(addSum)}`);
      return;
    }
  }
}
