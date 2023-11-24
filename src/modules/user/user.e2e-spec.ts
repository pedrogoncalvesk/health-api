import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { RedisModule } from '../../common/cache/redis/redis.module';
import { handleAuthMock } from '../../../test/mocks/auth.mock';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { UserModule } from './user.module';

describe('e2e /users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UserModule,
        RedisModule,
        // ConfigModule.forRoot({
        //   load: [loadConfig],
        // }),
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => handleAuthMock(context),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users?cpf=01234567890')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
