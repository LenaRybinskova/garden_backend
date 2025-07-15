import { INestApplication } from '@nestjs/common';
import { getSwaggerConfig } from 'src/auth/config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const configSwagger = getSwaggerConfig();

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('/swagger', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yaml',
  });
};
