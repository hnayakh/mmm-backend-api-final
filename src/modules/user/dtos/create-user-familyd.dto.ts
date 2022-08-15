import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  FatherOccupation,
  MotherOccupation,
} from 'src/shared/enums/user-profile.enum';

export class CreateUserFamilyDDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @IsNotEmpty({ message: 'Father occupation can not be empty.' })
  @ApiProperty({ example: FatherOccupation.Business })
  fatherOccupation: FatherOccupation;

  @IsNotEmpty({ message: 'Mother occupation can not be empty.' })
  @ApiProperty({ example: MotherOccupation.HomeMaker })
  motherOccupation: MotherOccupation;

  @IsNotEmpty({ message: 'No. of brothers can not be empty.' })
  @ApiProperty({ example: 0 })
  numberOfBrothers: number;

  @IsNotEmpty({ message: 'Married No. of brothers can not be empty.' })
  @ApiProperty({ example: 0 })
  marriedNumberOfBrothers: number;

  @IsNotEmpty({ message: 'No. of sisters can not be empty.' })
  @ApiProperty({ example: 0 })
  numberOfSisters: number;

  @IsNotEmpty({ message: 'Married No. of sisters can not be empty.' })
  @ApiProperty({ example: 0 })
  marriedNumberOfSisters: number;
}
