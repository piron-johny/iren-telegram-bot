import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { join } from 'path';
import { BotModule } from './bot/bot.module';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';

const sessions = new LocalSession({ database: 'session-db.json' });

@Module({
  imports: [
    AppConfigModule,
    BotModule,
    TelegrafModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfigService: AppConfigService) => {
        return {
          token: appConfigService.bot_token,
          middlewares: [sessions.middleware()],
        };
      },
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [AppConfigModule],
    //   inject: [AppConfigService],
    //   useFactory: async (appConfigService: AppConfigService) => {
    //     console.log('PORT =>', appConfigService.port);
    //     return {
    //       type: 'postgres',
    //       host: 'localhost',
    //       port: 5432,
    //       database: 'tg-bot',
    //       username: 'postgres',
    //       password: '',
    //       // entities: [join(__dirname, '**', '*.entity.{ts, js}')],
    //       // migrations: [join(__dirname, '**', '*.migrations.{ts, js}')],
    //       synchronize: true,
    //     };
    //   },
    // }),
  ],
})
export class AppModule {}
