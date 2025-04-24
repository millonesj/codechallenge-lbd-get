import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UnsplashService } from './unsplash.service';

@Module({
  imports: [HttpModule],
  providers: [UnsplashService, Logger, ConfigService],
  exports: [UnsplashService, Logger],
})
export class UnsplashModule {}
