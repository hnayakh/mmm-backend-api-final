import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  FamilyAfluenceLevel,
  FamilyType,
  FamilyValues,
} from 'src/shared/enums/user-profile.enum';

export class CreateUserFamilyBgDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @IsNotEmpty({ message: 'Family status can not be empty.' })
  @ApiProperty({ example: FamilyAfluenceLevel.MiddleClass })
  familyStatus: FamilyAfluenceLevel;

  @IsNotEmpty({ message: 'Family value can not be empty.' })
  @ApiProperty({ example: FamilyValues.Moderate })
  familyValues: FamilyValues;

  @IsNotEmpty({ message: 'Employed in can not be empty.' })
  @ApiProperty({ example: FamilyType.Joint })
  familyType: FamilyType;

  // @IsNotEmpty({ message: 'Country can not be empty.' })
  @ApiProperty({ example: 2 })
  country: number;
  
  @ApiProperty({ example: 2 })
  isResidingWithFamily: number;

  // @IsNotEmpty({ message: 'State can not be empty.' })
  @ApiProperty({ example: 1 })
  state: number;

  // @IsNotEmpty({ message: 'City can not be empty.' })
  @ApiProperty({ example: 3 })
  city: number;
}
