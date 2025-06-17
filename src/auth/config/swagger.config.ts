import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Garden history ')
    .setDescription('Api Documentation')
    .setVersion('1.0.0')
    .setContact(
      'Lena Rybinskova',
      'https://github.com/LenaRybinskova/garden_backend',
      'lenaRybinskova@gmail.com',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'В заголовках должно быть Authorization: Bearer <token>',
        in: 'header',
      },
      'Bearer',
    )
    .build();
}
