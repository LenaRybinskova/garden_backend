import { ApiProperty } from '@nestjs/swagger';

export class MeAccessResDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  email: string;
}
