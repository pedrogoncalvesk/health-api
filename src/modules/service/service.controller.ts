import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

import {
  ApiDataResponse,
  ApiErrorResponse,
  Roles,
} from '../../common/decorators';
import { PageOptionsDto } from '../../common/dto';
import { ResponseMessage } from '../../common/interfaces/response-message';
import { X_API_KEY } from '../../shared/constants';
import { ListServiceDto, PostServiceDto } from './dto';
import { PostServicePipe } from './pipes';
import { ServiceService } from './service.service';

@ApiSecurity(X_API_KEY)
@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private service: ServiceService) {}

  /**
   * Create service data
   */
  @ApiDataResponse({
    status: HttpStatus.CREATED,
    type: ResponseMessage,
  })
  @ApiErrorResponse()
  @Roles()
  @Post()
  postService(@Body(PostServicePipe) body: PostServiceDto) {
    return this.service.create(body);
  }

  /**
   * Get services
   */
  // @ApiPaginatedResponse({
  //   description: 'OK',
  //   type: GetServiceModel,
  // })
  @ApiErrorResponse()
  // @Roles(ProfileRoleEnum.ADMIN)
  // @UseGuards(JwtAuthGuard) is global
  @Get()
  getServices(
    @Query() paginator: PageOptionsDto,
    @Query() query: ListServiceDto,
  ) {
    return this.service.findAll({ ...paginator, ...query });
  }

  /**
   * Get service
   */
  // @ApiPaginatedResponse({
  //   description: 'Service data',
  //   type: GetServiceModel,
  // })
  @ApiErrorResponse()
  @Get(':id')
  getServiceById(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // /**
  //  * Update service data
  //  */
  // // @ApiDataResponse({
  // //   status: HttpStatus.OK,
  // //   description: 'OK',
  // //   type: ResponseMessage,
  // // })
  // @ApiErrorResponse()
  // @Roles()
  // @Patch()
  // patchService(@Body(PatchServicePipe) body: PatchServiceDto) {
  //   return this.service.update(body);
  // }
}
