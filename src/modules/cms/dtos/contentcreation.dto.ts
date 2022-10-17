import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';

export class ContentCreationDto {
  @IsNotEmpty({ message: 'question can not be empty.' })
  @ApiProperty({ example: 100 })
  channel: string;

  @IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  template_name: string;

  // @IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  content_heading: string;

  @IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  content: string;

  //@IsNotEmpty({ message: 'answer can not be empty.' })
  @ApiProperty({ example: 100 })
  photo: string;

  @IsNotEmpty({ message: 'position can not be empty.' })
  @ApiProperty({ example: 100 })
  position: number;
}
