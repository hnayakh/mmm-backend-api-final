import { ApiProperty } from '@nestjs/swagger';

export class SocialLoginDto {
  @ApiProperty({ example: 'rutuparna.rout@gmail.com' })
  email: string;

  @ApiProperty({ example: 'jwjeifnn2322jfjfnjwnffe22f232ef232wefwnfjwnf' })
  socialProviderId: string;

  @ApiProperty({ example: 'Password@123' })
  socailAccessToken: string;
  
  @ApiProperty({ example: 'Password@123' })
  fireBaseToken: string;
}