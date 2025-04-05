import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Замініть на ваш фронтенд
    methods: 'GET,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
