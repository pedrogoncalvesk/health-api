import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../user/entities/user.entity';
import { PostUserDto } from '../../user/dto';
import { JwtTokenDto } from '../dto/token-jwt.dto';

@Injectable()
export abstract class IAuthUseCase {
  /**
   * Get user's
   */
  abstract authentication(
    username: string,
    password: string,
  ): Promise<UserEntity>;

  /**
   * Get user token JWT
   */
  abstract signWithCredentials(body: UserEntity): Promise<JwtTokenDto>;

  /**
   * Save user's data
   */
  abstract saveUser(body: PostUserDto): Promise<JwtTokenDto>;
}
