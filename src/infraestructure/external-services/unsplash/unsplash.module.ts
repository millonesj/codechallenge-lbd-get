import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UnsplashService } from './unsplash.service';
import { RedisCacheModule } from 'src/infraestructure/cache/redis-cache.module';

@Module({
  imports: [HttpModule, RedisCacheModule],
  providers: [UnsplashService, Logger, ConfigService],
  exports: [UnsplashService, Logger],
})
export class UnsplashModule {}
