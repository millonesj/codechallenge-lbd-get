import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwapiService } from './swapi.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [SwapiService, Logger, ConfigService],
  exports: [SwapiService, Logger],
})
export class SwapiModule {}
