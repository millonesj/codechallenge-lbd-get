import { Controller, Get, Param, Query, Response } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from 'src/application/app.service';
import { FindOnePeopleDto } from './fusionados/find-one.people.dto';
import { CharacterProfileHistoryPaginationDto } from './historial/character-profile-history-pagination.dto';
import { CharacterService } from 'src/application/character.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly characterService: CharacterService,
  ) {}

  @Throttle({ default: { limit: 1, ttl: 60000 } })
  @Get('/fusionados/:id')
  /* @Throttle It allows setting a request limit
      In this case, 3 requests per minute.
  */
  getMerged(@Param() findOnePeopleDto: FindOnePeopleDto) {
    return this.appService.getMerged(findOnePeopleDto.id);
  }

  @Get('historial')
  async findAllCharacterProfileHistory(
    @Query()
    characterProfileHistoryPaginationDto: CharacterProfileHistoryPaginationDto,
    @Response() res,
  ) {
    const providers = await this.characterService.findAll(
      characterProfileHistoryPaginationDto,
    );

    return res.status(200).send(providers);
  }

  @Get('status')
  getStatus() {
    return { message: 'ok' };
  }
}
