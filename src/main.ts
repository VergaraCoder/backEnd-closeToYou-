import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FilterError } from './common/erros/filter/filter.exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FilterError());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
