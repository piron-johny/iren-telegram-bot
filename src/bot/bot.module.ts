import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [AppConfigModule],
  providers: [BotService, BotUpdate],
})
export class BotModule { }
