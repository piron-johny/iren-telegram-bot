import { Context as TelegrafCtx } from "telegraf";

export interface Context extends TelegrafCtx {
  session: {
    type?: 'add' | null
  }
}