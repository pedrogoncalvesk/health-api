import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisOptionsFactory } from '../../../infra/cache/redis';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: RedisOptionsFactory,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
