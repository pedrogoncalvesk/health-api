import { Injectable } from '@nestjs/common';

import { BaseService } from '../../common/data/base';
import { ServiceRepository } from './repositories/service.repository';

@Injectable()
export class ServiceService extends BaseService {
  constructor(private readonly serviceRepository: ServiceRepository) {
    super(serviceRepository);
  }
}
