import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { BotModule } from './bot/bot.module';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';

const sessions = new LocalSession({ database: 'session-db.json' })

@Module({
  imports: [
    AppConfigModule,
    BotModule,
    TelegrafModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => {
        console.log('PORT =>', appConfigService.port)
        return ({
          token: appConfigService.bot_token,
          middlewares: [sessions.middleware()],
        })
      }
    }),
  ],
})
export class AppModule { }
