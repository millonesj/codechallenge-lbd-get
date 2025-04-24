import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './infraestructure/config/configuration';

async function bootstrap() {
  const { port } = config();
  const app = await NestFactory.create(AppModule);
  await app.listen(port).then(() => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();
