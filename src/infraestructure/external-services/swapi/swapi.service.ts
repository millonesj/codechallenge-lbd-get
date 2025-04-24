import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import { StarWarsCharacterI } from './character.interface';
import { RedisCacheService } from '../../cache/redis-cache.service';

@Injectable()
export class SwapiService {
  private readonly URL_SWAPI: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly redisCacheService: RedisCacheService,
  ) {
    this.URL_SWAPI = this.configService.get<string>('swapi.url');
  }

  async getCharacter(id: number): Promise<StarWarsCharacterI> {
    try {
      const swapKey = `swapi-${id}`;
      const userFromCache = await this.getFromRedis(swapKey);

      if (userFromCache) {
        this.logger.log(`SwapiService.getCharacter`, {
          userFromCache: true,
        });
        return userFromCache;
      }

      const agent = new https.Agent({ rejectUnauthorized: false });
      const { data } = await this.httpService.axiosRef.get(
        `${this.URL_SWAPI}/people/${id}`,
        {
          httpsAgent: agent,
        },
      );
      this.saveToRedis(swapKey, data);
      return data;
    } catch (error) {
      this.logger.error('SwapiService', error?.name);
      throw error;
    }
  }

  private async getFromRedis(userId: string): Promise<any | boolean> {
    const redisResult = await this.redisCacheService.get(userId);
    return redisResult === false ? false : JSON.parse(redisResult);
  }

  private saveToRedis(userId: string, readInfoClientInternalDTO: any) {
    this.redisCacheService
      .set(userId, JSON.stringify(readInfoClientInternalDTO))
      .then((saved) => {
        this.logger.log(`SwapiService.saveToRedis`, {
          saved,
        });
      });
  }
}
