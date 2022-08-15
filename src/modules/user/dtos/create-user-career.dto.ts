import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AnualIncome } from 'src/shared/enums/user-profile.enum';

export class CreateUserCareerDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @IsNotEmpty({ message: 'Employed in can not be empty.' })
  @ApiProperty({ example: 'Google Inc.' })
  employedIn: string;

  @IsNotEmpty({ message: 'Occupation can not be empty.' })
  @ApiProperty({ example: 'SSE' })
  occupation: string;

  @IsNotEmpty({ message: 'Annual income can not be empty.' })
  @ApiProperty({ example: AnualIncome.FiveToSevenLacs })
  annualIncome: AnualIncome;

  @IsNotEmpty({ message: 'Highest education can not be empty.' })
  @ApiProperty({ example: 'Graduate' })
  highestEducation: string;

  @IsNotEmpty({ message: 'Country can not be empty.' })
  @ApiProperty({ example: 2 })
  country: number;

  @IsNotEmpty({ message: 'State can not be empty.' })
  @ApiProperty({ example: 1 })
  state: number;

  @IsNotEmpty({ message: 'City can not be empty.' })
  @ApiProperty({ example: 3 })
  city: number;
}
