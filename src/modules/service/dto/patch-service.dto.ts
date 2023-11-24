import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class PatchServiceDto {
  @ApiProperty({ description: 'Name' })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Length(4, 255, { message: 'Name min 4 e max 255 characters' })
  name?: string;

  @ApiProperty({ description: 'Description' })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
