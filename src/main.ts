import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from 'src/utils/swagger-utils';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  setupSwagger(app);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  //app.enableCors({
  //   origin: ['https://your-next-app.com'],
  //   credentials: true,
  // }); // если фронтенд на др домене чтобы отобр статика
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
