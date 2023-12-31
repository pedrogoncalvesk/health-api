import { ApiProperty } from '@nestjs/swagger';

import { UserStatusEnum } from '../enums/user-status.enum';
import { GetTaskDto } from '../../task/dto';

/**
 * Response user
 */
export class GetUserModel {
  @ApiProperty()
  id: number;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  status: UserStatusEnum;
  @ApiProperty()
  profile: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  tasks: GetTaskDto[];
}
