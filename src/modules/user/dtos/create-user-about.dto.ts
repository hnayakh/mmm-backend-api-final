import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  AbilityStatus,
  ChildrenStatus,
  Gender,
  MaritalStatus,
  NumberOfChildren,
  Relationship,
} from 'src/shared/enums/user-profile.enum';

export class CreateUserAboutDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @IsNotEmpty({ message: 'Name can not be empty.' })
  @ApiProperty({ example: 'Rutuparna Rout' })
  name: string;

  @IsNotEmpty({ message: 'Date of birth can not be empty.' })
  @ApiProperty({ example: '1997-09-21' })
  dateOfBirth: string;

  @IsNotEmpty({ message: 'MaritalStatus can not be empty.' })
  @ApiProperty({ example: MaritalStatus.NeverMarried })
  maritalStatus: MaritalStatus;

  @IsNotEmpty({ message: 'Children Status can not be empty.' })
  @ApiProperty({ example: ChildrenStatus.No })
  childrenStatus: ChildrenStatus;

  @IsNotEmpty({ message: 'Ability Status can not be empty.' })
  @ApiProperty({ example: AbilityStatus.Normal })
  abilityStatus: AbilityStatus;

  @IsNotEmpty({ message: 'Height can not be empty.' })
  @ApiProperty({ example: 5.8 })
  height: number;

  @ApiProperty({ example: NumberOfChildren.One })
  numberOfChildren: NumberOfChildren;
}
