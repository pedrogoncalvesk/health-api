import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ApiDataResponse,
  ApiErrorResponse,
  Public,
} from '../../common/decorators';
import {
  ResponseErrorMessage,
  ResponseMessage,
} from '../../common/interfaces/response-message';
import { HealthService } from './health.service';

@Public()
@ApiTags('health')
@Controller(['health'])
export class HealthController {
  constructor(private service: HealthService) {}
  /**
   * Health check status
   */
  @ApiDataResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: ResponseMessage,
  })
  @ApiDataResponse({
    status: HttpStatus.REQUEST_TIMEOUT,
    description: 'Request timeout',
    type: ResponseErrorMessage,
  })
  @ApiErrorResponse()
  @Get()
  getHealth() {
    return this.service.healthCheck();
  }
}
