import { Action, Command, Ctx, Hears, Help, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { buttons, buttonsLine } from './bot.buttons';
import { BotService } from './bot.service';
import { ADD, INFO, SKILLS, STOP } from './constants/answers.constatns';
import { buttonName } from './constants/button.constants';
import { listMarkup } from './helpers/list-markup.pelpers';
import { Context } from './interfaces/ctx.interface';
import { IList } from './interfaces/list.interface';

const { list, add, skills, stop } = buttonName;

const list1: IList[] = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    cost: 20
  },
  {
    id: 2,
    date: new Date().toLocaleDateString(),
    cost: 43
  },
]

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botServise: BotService
  ) { }


  @Start()
  async start(ctx: Context) {
    await ctx.reply(`Привет ${ctx.message.from.first_name}✌️`, buttons())
    await ctx.setMyCommands([
      { command: '/start', description: 'Запуск бота' },
      { command: '/help', description: 'Помощь' },
      { command: '/info', description: 'Информация о боте' },
    ])
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
    await ctx.replyWithHTML(listMarkup(list1))
  }

  @Hears(add.name)
  async add(ctx: Context) {
    await ctx.reply(ADD)
    ctx.session.type = 'add';
  }

  @Hears(skills.name)
  async skills(ctx: Context) {
    await ctx.reply(SKILLS)
  }

  @Hears(stop.name)
  async stop(ctx: Context) {
    await ctx.reply(STOP)
    // this.bot.stop()
  }

  @Hears('test-2')
  async test3(ctx: Context) {
    console.log('\n\nctx 1', ctx)
    await ctx.reply('Test 2', buttonsLine())

  }

  @On('text')
  async foo(@Ctx() ctx: Context, @Message('text') text: string) {
    if (!ctx.session.type) return

    if (ctx.session.type === 'add') {
      if (isNaN(Number(text))) {
        await ctx.reply('❗ Нужно вводить число.\nБудь внимательнее,  буквы тут вводить нельзя 👀\nДавай еще раз, у тебя получится 😊')
        return
      }

      console.log('text', text)
      const date = new Date().toLocaleDateString()
      const entity = {
        id: 3,
        cost: Math.round((Number(text) / 1000 * 26)),
        date
      }

      list1.push(entity)
      await ctx.reply('Проверь добавление ⬇️')
      await ctx.replyWithHTML(listMarkup(list1))
      ctx.session.type = null

    }
  }

  @Command('/test')
  async on(ctx: Context) {
    console.log('ctx', ctx)
    await ctx.reply('👍');
    // this.bot.stop()
  }


}
