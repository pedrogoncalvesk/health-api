import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common';

import { CacheRedisConfig } from '../../config/cache-redis.config';

export class RedisOptionsFactory implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions | Promise<CacheModuleOptions> {
    const config = new CacheRedisConfig().provider;
    if (!config.host) {
      return null;
    }
    return config;
  }
}
