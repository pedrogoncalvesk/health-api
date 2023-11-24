import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  AppConfig,
  CacheRedisConfig,
  DatabaseTypeOrmConfig,
  DATABASE_TYPEORM_CONFIG_KEY,
} from './infra/config';
import { AppInterceptor } from './core/interceptors';
import { AuthGuard } from './core/guards/auth.guard';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RedisModule } from './common/cache/redis/redis.module';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { ServiceModule } from './modules/service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [
        new AppConfig().registerAs(),
        new CacheRedisConfig().registerAs(),
        new DatabaseTypeOrmConfig().registerAs(),
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get(DATABASE_TYPEORM_CONFIG_KEY),
      inject: [ConfigService],
    }),
    RedisModule,
    HealthModule,
    // AuthModule,
    // TaskModule,
    // UserModule,
    ServiceModule,
  ],
  providers: [
    {
      /**
       * Use an interceptor to set default response { data }
       */
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
    // {
    //   /**
    //    * The vast majority of endpoints should be protected by default
    //    *
    //    * Register the authentication guard as a global guard and instead of using @UseGuards(JwtAuthGuard)
    //    *
    //    * Decorator on top of each controller, you could simply flag which routes should be public using @Public()
    //    *
    //    */
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   /**
    //    * All enpoints should be protected with roles using @Roles()
    //    */
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
