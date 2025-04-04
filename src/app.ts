import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './config.module';

let app: INestApplication;

export function configureApp(appModule: INestApplication): void {
  appModule.enableVersioning();
  appModule.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  appModule.enableCors();
}

async function createAppModule(): Promise<NestExpressApplication> {
  const appModule = await NestFactory.create<NestExpressApplication>(AppModule);
  configureApp(appModule);
  return appModule;
}

export default async function getApp(): Promise<INestApplication> {
  if (!app) {
    app = await createAppModule();
    await app.init();
  }
  return app;
}
