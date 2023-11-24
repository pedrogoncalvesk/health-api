import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class ListServiceDto {
  @ApiProperty({ description: 'Name', required: false })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Length(0, 255, { message: 'Max 255 characters' })
  name?: string;
}
