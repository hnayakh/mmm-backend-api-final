import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';

export class SuccessStoriesDto {
  @IsNotEmpty({ message: 'heading can not be empty.' })
  @ApiProperty({ example: 100 })
  heading: string;

  @IsNotEmpty({ message: 'story can not be empty.' })
  @ApiProperty({ example: 100 })
  story: string;

  // @IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  photo: string;

  @IsNotEmpty({ message: 'position can not be empty.' })
  @ApiProperty({ example: 100 })
  position: number;
}
