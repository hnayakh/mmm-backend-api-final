import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OtpType } from 'src/shared/enums/miscellaneous.enum';

export class CreateOtpDto {
  @ApiProperty({ example: '+91' })
  countryCode?: string;

  @ApiProperty({ example: '9965498121' })
  phoneNumber?: string;

  @ApiProperty({ example: OtpType.Login })
  @IsNotEmpty()
  type: OtpType;

  @ApiProperty({ example: 'rutuparna.rout@gmail.com' })
  email?: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '+91' })
  countryCode?: string;

  @ApiProperty({ example: '9965498121' })
  phoneNumber?: string;

  @ApiProperty({ example: OtpType.Login })
  @IsNotEmpty()
  type: OtpType;

  @ApiProperty({ example: 'rutuparna.rout@gmail.com' })
  email?: string;

  @ApiProperty({ example: '661921' })
  @IsNotEmpty()
  otp: string;
}
