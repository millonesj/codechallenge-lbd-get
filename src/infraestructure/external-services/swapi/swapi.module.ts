import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwapiService } from './swapi.service';
import { ConfigService } from '@nestjs/config';
import { RedisCacheModule } from 'src/infraestructure/cache/redis-cache.module';

@Module({
  imports: [HttpModule, RedisCacheModule],
  providers: [SwapiService, Logger, ConfigService],
  exports: [SwapiService, Logger],
})
export class SwapiModule {}
