import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { handleEntity } from '../../../global';
import { BaseValidationPipe } from '../../../common/data/pipes/base-validation.pipe';
import { SERVICE_MESSAGES } from '../constants/service.constants';
import { PatchServiceDto } from '../dto/patch-service.dto';
import { ServiceRepository } from '../repositories/service.repository';

/**
 * Validate scope patch
 */
@Injectable({ scope: Scope.REQUEST })
export class PatchServicePipe extends BaseValidationPipe {
  constructor(
    @Inject(REQUEST) protected request: Request,
    private serviceRepository: ServiceRepository,
  ) {
    super(request);
  }

  async validate(body: PatchServiceDto) {
    if (!body.name) {
      return true;
    }

    const services = await this.serviceRepository.find({
      where: { name: body.name },
    });

    if (services && services.length > 0) {
      handleEntity(SERVICE_MESSAGES.SERVICE_EXISTS);
    }

    return true;
  }
}
