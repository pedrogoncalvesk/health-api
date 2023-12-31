import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';

import { UserStatusEnum } from '../enums/user-status.enum';

export class GetUserDto {
  @IsOptional()
  @ApiProperty({ description: 'Username', required: false })
  @Length(0, 100, { message: 'Max 100 characteres' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email is not valid' })
  @ApiProperty({ description: 'Email', required: false })
  email: string;

  @IsOptional()
  @IsEnum(UserStatusEnum, { message: 'Status invalid' })
  @ApiProperty({ enum: UserStatusEnum, required: false })
  status: UserStatusEnum;

  @IsOptional()
  @ApiProperty({ description: 'CPF', required: false })
  cpf: string;
}
