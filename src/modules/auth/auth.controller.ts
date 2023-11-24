import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import {
  ApiDataResponse,
  ApiErrorResponse,
  Public,
  Roles,
} from '../../common/decorators';
import { X_API_KEY } from '../../shared/constants';
import { CpfHeaderDto } from '../../shared/dto';
import { CpfHeader } from '../../shared/decorators';
import { ProfileRoleEnum } from '../../shared/roles/profile.role.enum';
import { PostUserPipe } from '../user/pipes';
import { PostUserDto } from '../user/dto';
import { JwtTokenDto, PostAuthDto, UserDataAuthDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAuthUseCase } from './interfaces/iauth.usecase';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private service: IAuthUseCase) {}

  /**
   * Authentication and get token
   * */
  @ApiDataResponse({
    status: HttpStatus.CREATED,
    type: JwtTokenDto,
  })
  @ApiErrorResponse()
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('token')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async accessToken(@Request() req, @Body() body: PostAuthDto) {
    return this.service.signWithCredentials(req.user);
  }

  /**
   * Refresh token
   * */
  @ApiDataResponse({
    status: HttpStatus.CREATED,
    type: JwtTokenDto,
  })
  @ApiErrorResponse()
  @Public()
  @Post('refresh-token')
  async refreshToken(@Request() req: Request) {
    return this.service.signWithCredentials(req.headers[X_API_KEY]);
  }

  /**
   * Save user
   * */
  @ApiDataResponse({
    status: HttpStatus.CREATED,
    type: JwtTokenDto,
  })
  @ApiHeader({
    name: 'cpf',
    description: 'CPF user',
    required: true,
  })
  @ApiErrorResponse()
  @Public()
  @Post('register')
  register(
    @CpfHeader(CpfHeaderDto)
    @Body(PostUserPipe)
    body: PostUserDto,
  ) {
    return this.service.saveUser(body);
  }
  /**
   * Data information from user authenticated
   */
  @ApiDataResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: UserDataAuthDto,
  })
  @ApiErrorResponse()
  @Get('/info')
  @Roles(ProfileRoleEnum.DEFAULT)
  getUserInfo(@Request() req) {
    return req.user;
  }
}
