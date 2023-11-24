import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { type AppConfigType, APP_CONFIG_KEY } from './infra/config';
import { AppModule } from './app.module';
import { initializeMiddlewares } from './core/middlewares/app.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeMiddlewares(app);

  const appConfig = app.get(ConfigService).get<AppConfigType>(APP_CONFIG_KEY);

  await app.listen(appConfig.port);
  Logger.log(`🚀 Application is running on port ${appConfig.port}`);
}

void bootstrap();
