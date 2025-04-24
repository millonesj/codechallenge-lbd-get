import { Controller, Get, Param, Query, Response } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from '../application/app.service';
import { FindOnePeopleDto } from './fusionados/find-one.people.dto';
import { CharacterProfileHistoryPaginationDto } from './historial/character-profile-history-pagination.dto';
import { CharacterService } from '../application/character.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CharacterProfileDto } from '../application/character-profile.dto';

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
  @ApiOperation({ summary: 'Merge character data from SWAPI and Unsplash' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Character ID from SWAPI',
  })
  @ApiResponse({
    status: 200,
    description: 'Merged character data, add image from Unsplash API',
    type: CharacterProfileDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid ID',
    schema: {
      example: {
        status: 400,
        message: [
          'id must be a number conforming to the specified constraints',
        ],
        path: '/api/fusionados/fsdf',
      },
    },
  })
  getMerged(@Param() findOnePeopleDto: FindOnePeopleDto) {
    return this.appService.getMerged(findOnePeopleDto.id);
  }

  @Get('historial')
  @ApiOperation({ summary: 'Get paginated character profile history' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Paginated character profile history',
    schema: {
      example: {
        items: [
          {
            id: 1,
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hairColor: 'blond',
            skinColor: 'fair',
            eyeColor: 'blue',
            birthYear: '19BBY',
            gender: 'male',
            imageUrl: 'https://example.com/luke.jpg',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-02T00:00:00.000Z',
          },
        ],
        count: 1,
      },
    },
  })
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
