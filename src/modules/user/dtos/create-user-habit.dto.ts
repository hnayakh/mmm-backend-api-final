import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  AbilityStatus,
  ChildrenStatus,
  DrinkingHabit,
  EatingHabit,
  Gender,
  MaritalStatus,
  Relationship,
  SmokingHabit,
} from 'src/shared/enums/user-profile.enum';

export class CreateUserHabitDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @IsNotEmpty({ message: 'Eating Habit can not be empty.' })
  @ApiProperty({ example: EatingHabit.Vegetarrian })
  eatingHabit: EatingHabit;

  @IsNotEmpty({ message: 'Smoking Habit can not be empty.' })
  @ApiProperty({ example: SmokingHabit.Occasionally })
  smokingHabit: SmokingHabit;

  @IsNotEmpty({ message: 'Drinking Habit can not be empty.' })
  @ApiProperty({ example: DrinkingHabit.Nonalcoholic })
  drinkingHabit: DrinkingHabit;
}
