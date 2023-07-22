import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';
import { AccountType, Gender, Relationship } from 'src/shared/enums/user-profile.enum';

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

  @IsNotEmpty({ message: 'FirebaseToken code can not be empty.' })
  @ApiProperty({ example: '+91' })
  fireBaseToken: string;

  @IsNotEmpty({ message: 'Phone number code can not be empty.' })
  @ApiProperty({ example: '9853461442' })
  phoneNumber: string;

  @ApiProperty({ example: 'User@123' })
  password: string | null | undefined;

  @IsNotEmpty({ message: 'Phone number code can not be empty.' })
  @ApiProperty({ example: 'User@123' })
  socialProvider: AccountType | null | undefined;

  @ApiProperty({ example: 'User@123' })
  providerId: string | null | undefined;

  // @ApiProperty({ example: ActivationStatus.Pending })
  // activationStatus: ActivationStatus;

  // @ApiProperty({ example: LifecycleStatus.Blocked })
  // lifecycleStatus: LifecycleStatus;
}
