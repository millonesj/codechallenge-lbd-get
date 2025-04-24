import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from '../cache/redis-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redis.host'),
        port: +configService.get('redis.port'),
        ttl: +configService.get('redis.ttl'),
        max: +configService.get('redis.max'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Logger, RedisCacheService],
  exports: [RedisCacheService, CacheModule],
})
export class RedisCacheModule {}
