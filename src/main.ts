import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FilterError } from './common/erros/filter/filter.exception';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new FilterError());
  app.enableCors({
    origin: '*', 
    credentials:true
  });
  await app.listen(3000);
}
bootstrap();
