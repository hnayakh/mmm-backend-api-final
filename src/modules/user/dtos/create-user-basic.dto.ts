import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';
import { Gender, Relationship } from 'src/shared/enums/user-profile.enum';

export class CreateUserBasicDto {
  @IsNotEmpty({ message: 'Relationship can not be empty.' })
  @ApiProperty({ example: Relationship.Self })
  relationship: Relationship;

  @IsNotEmpty({ message: 'Email can not be empty.' })
  @IsEmail()
  @ApiProperty({ example: 'rutuparna.rout@gmail.com' })
  email: string;

  @IsNotEmpty({ message: 'Gender can not be empty.' })
  @ApiProperty({ example: Gender.Male })
  gender: Gender;

  @IsNotEmpty({ message: 'Country code can not be empty.' })
  @ApiProperty({ example: '+91' })
  countryCode: string;

  @IsNotEmpty({ message: 'Phone number code can not be empty.' })
  @ApiProperty({ example: '9853461442' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Phone number code can not be empty.' })
  @ApiProperty({ example: 'User@123' })
  password: string;

  // @ApiProperty({ example: ActivationStatus.Pending })
  // activationStatus: ActivationStatus;

  // @ApiProperty({ example: LifecycleStatus.Blocked })
  // lifecycleStatus: LifecycleStatus;
}
