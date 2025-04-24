import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './presentation/app.controller';
import { AppService } from './application/app.service';
import { SwapiModule } from './infraestructure/external-services/swapi/swapi.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './infraestructure/config/configuration';
import { UnsplashModule } from './infraestructure/external-services/unsplash/unsplash.module';
import { LoggingMiddleware } from './infraestructure/logger/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SwapiModule,
    UnsplashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
