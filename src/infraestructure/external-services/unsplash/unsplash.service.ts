import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchImageI } from './image.interface';
import { RedisCacheService } from 'src/infraestructure/cache/redis-cache.service';

@Injectable()
export class UnsplashService {
  private readonly URL_UNSPLASH: string;
  private readonly CLIENT_ID_UNSPLASH: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly redisCacheService: RedisCacheService,
  ) {
    this.URL_UNSPLASH = this.configService.get<string>('unsplash.url');
    this.CLIENT_ID_UNSPLASH =
      this.configService.get<string>('unsplash.clientId');
  }

  async getImage(characterName: string): Promise<SearchImageI> {
    try {
      const unsplashKey = `unsplash-${this.normalizeRedisKey(characterName)}`;
      const userFromCache = await this.getFromRedis(unsplashKey);

      if (userFromCache) {
        this.logger.log(`SwapiService.getCharacter`, {
          userFromCache: true,
        });
        return userFromCache;
      }

      const { data } = await this.httpService.axiosRef.get(
        `${this.URL_UNSPLASH}/search/photos?query=${characterName}&page=1&per_page=1&client_id=${this.CLIENT_ID_UNSPLASH}`,
      );

      this.saveToRedis(unsplashKey, data);
      return data;
    } catch (error) {
      this.logger.error('UnsplashService', error?.name);
      throw error;
    }
  }

  private normalizeRedisKey(key: string): string {
    return key.trim().replace(/\s+/g, '-');
  }

  private async getFromRedis(userId: string): Promise<any | boolean> {
    const redisResult = await this.redisCacheService.get(userId);
    return redisResult === false ? false : JSON.parse(redisResult);
  }

  private saveToRedis(userId: string, readInfoClientInternalDTO: any) {
    this.redisCacheService
      .set(userId, JSON.stringify(readInfoClientInternalDTO))
      .then((saved) => {
        this.logger.log(`UnsplashService.saveToRedis`, {
          saved,
        });
      });
  }
}
