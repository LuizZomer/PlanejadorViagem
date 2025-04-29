import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationInterceptor } from './utils/interceptors/validation.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './utils/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ValidationInterceptor());
  app.useGlobalFilters(new PrismaExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
