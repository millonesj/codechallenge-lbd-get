import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<any> {
    const result: string = await this.cache.get(key);
    return result?.length ? result : false;
  }

  async set(key: string, value: string) {
    return this.cache.set(key, value);
  }
}
