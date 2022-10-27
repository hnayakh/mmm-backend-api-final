import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';

export class MessageDto {
  @IsNotEmpty({ message: 'User basicId can not be empty.' })
  @ApiProperty({ example: 100 })
  userbasicId: string;

  @IsNotEmpty({ message: 'reciever basicId can not be empty.' })
  @ApiProperty({ example: 100 })
  recieverBasicId: string;

  @IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  text: string;
}
