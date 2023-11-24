import { Module } from '@nestjs/common';

import {
  ServiceRepository,
  TypeOrmExModule,
} from './repositories/service.repository';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ServiceRepository])],
  providers: [
    ServiceService,
    // {
    //   provide: IUserUsecase,
    //   useClass: ServiceService,
    // },
    // ServiceRepository,
  ],
  controllers: [ServiceController],
  exports: [ServiceService],
})
export class ServiceModule {}
