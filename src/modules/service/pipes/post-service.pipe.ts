import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { BaseValidationPipe } from '../../../common/data/pipes/base-validation.pipe';
import { handleEntity } from '../../../global';
import { SERVICE_MESSAGES } from '../constants/service.constants';
import { PostServiceDto } from '../dto/post-service.dto';
import { ServiceRepository } from '../repositories/service.repository';

/**
 * Validate scope post
 */
@Injectable({ scope: Scope.REQUEST })
export class PostServicePipe extends BaseValidationPipe {
  constructor(
    @Inject(REQUEST) protected request: Request,
    private serviceRepository: ServiceRepository,
  ) {
    super(request);
  }

  async validate(body: PostServiceDto) {
    const services = await this.serviceRepository.find({
      where: { name: body.name },
    });

    if (services && services.length > 0) {
      handleEntity(SERVICE_MESSAGES.SERVICE_EXISTS);
    }

    return true;
  }
}
