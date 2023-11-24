import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { BaseConfig } from '../../common/data/base';
import { CACHE_1_DAY } from '../../shared/constants';

const cacheRedisConfigProvider: () => CacheRedisConfigType = () => ({
  store: redisStore,
  host: process.env.CACHE_REDIS_HOST,
  port: process.env.CACHE_REDIS_PORT
    ? parseInt(process.env.CACHE_REDIS_PORT)
    : 6379,
  password: process.env.CACHE_REDIS_PASSWORD,
  ttl: CACHE_1_DAY,
  db: 0,
});

export type CacheRedisConfigType = CacheModuleOptions & {
  store: any;
  host: string;
  port: number;
  password: string;
  ttl: number;
  db: number;
};

export const CACHE_REDIS_CONFIG_KEY = 'cacheRedisConfig';

/**
 * Cache Redis Config
 */
export class CacheRedisConfig extends BaseConfig<CacheRedisConfigType> {
  constructor() {
    super(CACHE_REDIS_CONFIG_KEY, cacheRedisConfigProvider);
  }
}
