import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('API Template')
  .setDescription('Here description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
