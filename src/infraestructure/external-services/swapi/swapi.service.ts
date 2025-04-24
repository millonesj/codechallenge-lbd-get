import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import { StarWarsCharacterI } from './character.interface';

@Injectable()
export class SwapiService {
  private readonly URL_SWAPI: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.URL_SWAPI = this.configService.get<string>('swapi.url');
  }

  async getCharacter(id: number): Promise<StarWarsCharacterI> {
    try {
      const agent = new https.Agent({ rejectUnauthorized: false });
      const { data } = await this.httpService.axiosRef.get(
        `${this.URL_SWAPI}/people/${id}`,
        {
          httpsAgent: agent,
        },
      );
      return data;
    } catch (error) {
      this.logger.error('SwapiService', error?.name);
      throw error;
    }
  }
}
