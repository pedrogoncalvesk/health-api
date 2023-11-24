import { ApiProperty } from '@nestjs/swagger';

/**
 * User data Authentication
 */
export class UserDataAuthDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  profile: string;
}
