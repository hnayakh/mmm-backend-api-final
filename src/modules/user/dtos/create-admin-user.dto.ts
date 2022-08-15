import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';
import { AdminRoles } from 'src/shared/enums/miscellaneous.enum';
import { Gender, Relationship } from 'src/shared/enums/user-profile.enum';

export class CreateAdminUserDto {
  @IsNotEmpty({ message: 'First name can not be empty' })
  @ApiProperty({ example: 'Michael' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name can not be empty' })
  @ApiProperty({ example: 'Holding' })
  lastName: string;

  @IsNotEmpty({ message: 'Email can not be empty.' })
  @IsEmail()
  @ApiProperty({ example: 'rutuparna.rout@gmail.com' })
  email: string;

  @IsNotEmpty({ message: 'Gender can not be empty.' })
  @ApiProperty({ example: Gender.Male })
  gender: Gender;

  @IsNotEmpty({ message: 'Phone number code can not be empty.' })
  @ApiProperty({ example: '9853461442' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Phone number code can not be empty.' })
  @ApiProperty({ example: 'User@123' })
  password: string;

  @IsNotEmpty({ message: 'Role can not be empty.' })
  @ApiProperty({ example: AdminRoles.Admin })
  role: AdminRoles;
}
