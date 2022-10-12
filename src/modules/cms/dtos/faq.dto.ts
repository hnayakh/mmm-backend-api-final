import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';

export class FaqDto {
  @IsNotEmpty({ message: 'question can not be empty.' })
  @ApiProperty({ example: 100 })
  question: string;

  @IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  answer: string;

  @IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  position: number;
}
