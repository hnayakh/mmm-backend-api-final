import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Manglik } from 'src/shared/enums/user-profile.enum';

export class CreateUserPreferenceDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @ApiProperty({ example: 20 })
  minAge: number;

  @ApiProperty({ example: 80 })
  maxAge: number;

  @ApiProperty({ example: 89 })
  minHeight: number;

  @ApiProperty({ example: 110 })
  maxHeight: number;

  @ApiProperty({ example: [1, 2] })
  maritalStatus: number[];

  @ApiProperty({ example: [' ', ' '] })
  country: string[];

  @ApiProperty({ example: [' ', ' '] })
  state: string[];

  @ApiProperty({ example: [' ', ' '] })
  city: string[];

  @ApiProperty({ example: [' ', ' '] })
  religion: string[];

  @ApiProperty({ example: [' ', ' '] })
  caste: string[];

  @ApiProperty({ example: [' ', ' '] })
  motherTongue: string[];

  @ApiProperty({ example: [' ', ' '] })
  highestEducation: string[];

  @ApiProperty({ example: [' ', ' '] })
  occupation: string[];

  @ApiProperty({ example: [1, 2] })
  maxIncome: number[];

  @ApiProperty({ example: [1, 2] })
  minIncome: number[];

  @ApiProperty({ example: [1, 2] })
  dietaryHabits: number[];

  @ApiProperty({ example: [1, 2] })
  drinkingHabits: number[];

  @ApiProperty({ example: [1, 2] })
  smokingHabits: number[];

  @ApiProperty({ example: 1 })
  challenged: number;
}
