import { Controller, Get, Param } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from 'src/application/app.service';
import { FindOnePeopleDto } from './fusionados/find-one.people.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Throttle({ default: { limit: 1, ttl: 60000 } })
  @Get('/fusionados/:id')
  /* @Throttle It allows setting a request limit
      In this case, 3 requests per minute.
  */
  getMerged(@Param() findOnePeopleDto: FindOnePeopleDto) {
    return this.appService.getMerged(findOnePeopleDto.id);
  }

  @Get('status')
  getStatus() {
    return { message: 'ok' };
  }
}
