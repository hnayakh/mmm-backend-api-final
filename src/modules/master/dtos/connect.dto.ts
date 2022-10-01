import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';

export class ConnectDto {
  // @IsNotEmpty({ message: 'connectId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  connectId: string;

  @ApiProperty({ example: 500 })
  connectPrice: number;

  @ApiProperty({ example: DiscountType.Amount })
  discountType: DiscountType;

  @ApiProperty({ example: 23 })
  discount: number;

  @ApiProperty({ example: 345 })
  discountedPrice: number;

  @ApiProperty({ example: 30 })
  firstTimeBenifitMins: number;

  @ApiProperty({ example: 60 })
  secondTimeBenifitMins: number;

  @ApiProperty({ example: 1 })
  type: number; // 1 = Create 2 = Update
}
