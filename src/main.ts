import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"*"
  })
  app.use(express.static("."))

  const config = new DocumentBuilder()
    .setTitle("Movie18")
    .setDescription("Api Movie")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/swagger',app,document)
    
  await app.listen(8001);
}
bootstrap();