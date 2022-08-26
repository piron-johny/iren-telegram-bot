import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('host');
  }
  get port(): string {
    return this.configService.get<string>('port');
  }
  get bot_token(): string {
    return this.configService.get<string>('bot_token');
  }
  get sheet_id(): string {
    return this.configService.get<string>('sheet_id');
  }
  get private_key(): string {
    return this.configService.get<string>('private_key');
  }
  get client_email(): string {
    return this.configService.get<string>('client_email');
  }
}
