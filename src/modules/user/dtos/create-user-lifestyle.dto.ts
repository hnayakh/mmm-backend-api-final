import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  AbilityStatus,
  ChildrenStatus,
  DrinkingHabit,
  EatingHabit,
  Gender,
  LifestyleOptions,
  MaritalStatus,
  Relationship,
  SmokingHabit,
} from 'src/shared/enums/user-profile.enum';

export class CreateUserLifestyleDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  // @IsNotEmpty({ message: 'Lifestyle can not be empty.' })
 // @ApiProperty({ example: LifestyleOptions.Cars })
  lifestyle: string;


}
