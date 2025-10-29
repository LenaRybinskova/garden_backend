import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'src/utils/swagger-utils';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000', // Для локальной разработки
      'https://garden-frontend-upd-lena-3.amvera.io',
    ],
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  setupSwagger(app);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  //app.enableCors({
  //   origin: ['https://your-next-app.com'],
  //   credentials: true,
  // }); // если фронтенд на др домене чтобы отобр статика
  // await app.listen(process.env.PORT ?? 3000); исправила для Амвера
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
