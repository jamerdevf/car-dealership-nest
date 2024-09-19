import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo deja la data que estoy esperando
      forbidNonWhitelisted: true, // si viene algo que no estoy esperando, no lo permite
      }),
  )


  await app.listen(3000); // se puede dejar en cualquier puerto ej: 4000
}
bootstrap();
