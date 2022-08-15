import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ example: 'rutuparna.rout@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Password@123' })
  password: string;
}
