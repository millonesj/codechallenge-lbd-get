import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from '../../application/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Throttle({ default: { limit: 1, ttl: 60000 } })
  @Get('/greeting')
  /* @Throttle It allows setting a request limit
      In this case, 3 requests per minute.
  */
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus() {
    return { message: 'ok' };
  }
}
