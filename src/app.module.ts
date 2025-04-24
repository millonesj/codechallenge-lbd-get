import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './presentation/app.controller';
import { AppService } from './application/app.service';
import { SwapiModule } from './infraestructure/external-services/swapi/swapi.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './infraestructure/config/configuration';
import { UnsplashModule } from './infraestructure/external-services/unsplash/unsplash.module';
import { LoggingMiddleware } from './infraestructure/logger/logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infraestructure/config/type-orm-config';
import { CharacterService } from './application/character.service';
import { CharacterProfileHistory } from './domain/character-profile-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      useFactory: async () => typeOrmConfig,
      inject: [ConfigService],
    }),
    SwapiModule,
    UnsplashModule,
    TypeOrmModule.forFeature([CharacterProfileHistory]),
  ],
  controllers: [AppController],
  providers: [AppService, CharacterService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
