import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AppConfigService} from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.enableCors();
  
  await app.listen(appConfig.port || 8080);
}
bootstrap();
