import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchImageI } from './image.interface';

@Injectable()
export class UnsplashService {
  private readonly URL_UNSPLASH: string;
  private readonly CLIENT_ID_UNSPLASH: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.URL_UNSPLASH = this.configService.get<string>('unsplash.url');
    this.CLIENT_ID_UNSPLASH =
      this.configService.get<string>('unsplash.clientId');
  }

  async getImage(characterName: string): Promise<SearchImageI> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        `${this.URL_UNSPLASH}/search/photos?query=${characterName}&page=1&per_page=1&client_id=${this.CLIENT_ID_UNSPLASH}`,
      );
      return data;
    } catch (error) {
      this.logger.error('UnsplashService', error?.name);
      throw error;
    }
  }
}
