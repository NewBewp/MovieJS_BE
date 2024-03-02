import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"*"
  })
  app.use(express.static("."))
  await app.listen(8000);
}
bootstrap();
