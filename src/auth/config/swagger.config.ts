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
    .build();
}
