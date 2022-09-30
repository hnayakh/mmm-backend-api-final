import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';

export class RechargeHistoryDto {
  @IsNotEmpty({ message: 'actualAmount can not be empty.' })
  @ApiProperty({ example: 100 })
  actualAmount: number;

  @IsNotEmpty({ message: 'discountedAmount can not be empty.' })
  @ApiProperty({ example: 100 })
  discountedAmount: number;

  @ApiProperty({ example: true })
  isCouponApplied: boolean;

  @ApiProperty({ example: 'VGUGVDW56' })
  couponCode: string;

  @IsNotEmpty({ message: 'Amount can not be empty.' })
  @ApiProperty({ example: 100 })
  amount: number;

  @IsNotEmpty({ message: 'Connect count can not be empty.' })
  @ApiProperty({ example: 2 })
  connectCount: number;

  @IsNotEmpty({ message: 'Date can not be empty.' })
  @ApiProperty({ example: '1997-09-21' })
  date: string;

  @IsNotEmpty({ message: 'Payment mode can not be empty.' })
  @ApiProperty({ example: 1 })
  modeOfPayment: number;

  @IsNotEmpty({ message: 'TransactionId can not be empty.' })
  @ApiProperty({ example: 'a1b2-c3d4-e5f6B2C3-D4F6-G7H8' })
  transactionId: string;

  @ApiProperty({ example: 'Not enough balance' })
  failureReason: string;

  @IsNotEmpty({ message: 'User basicId can not be empty.' })
  @ApiProperty({ example: 'a1b2-c3d4-e5f6B2C3-D4F6-G7H8' })
  userBasicId: string;

  @IsNotEmpty({ message: 'Payment status can not be empty.' })
  @ApiProperty({ example: PaymentStatus.Success })
  paymentStatus: PaymentStatus;
}
