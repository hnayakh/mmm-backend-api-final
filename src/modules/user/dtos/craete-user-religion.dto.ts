import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Manglik } from 'src/shared/enums/user-profile.enum';

export class CreateUserReligionDto {
  @IsNotEmpty({ message: 'UserBasicId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  userBasicId: string;

  @IsNotEmpty({ message: 'Religion can not be empty.' })
  @ApiProperty({ example: 'Christian' })
  religion: string;

  @IsNotEmpty({ message: 'Cast can not be empty.' })
  @ApiProperty({ example: 'Catholic' })
  cast: string;

  @ApiProperty({ example: 'Catholic B' })
  gothra: string;

  @IsNotEmpty({ message: 'Mother tongue can not be empty.' })
  @ApiProperty({ example: 'Odia' })
  motherTongue: string;

  @IsNotEmpty({ message: 'Manglik can not be empty.' })
  @ApiProperty({ example: Manglik.No })
  isManglik: Manglik;
}
