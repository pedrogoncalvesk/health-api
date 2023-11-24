import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class PostServiceDto {
  @ApiProperty({ description: 'Name' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(4, 255, { message: 'Name min 4 e max 255 characters' })
  name: string;

  @ApiProperty({ description: 'Description' })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
