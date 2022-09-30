import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';
import { Manglik } from 'src/shared/enums/user-profile.enum';

export class CouponDto {
  // @IsNotEmpty({ message: 'couponId can not be empty.' })
  @ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' })
  couponId: string;

  @ApiProperty({ example: 'M2351' })
  couponCode: string;

  @ApiProperty({ example: DiscountType.Amount })
  discountType: DiscountType;

  @ApiProperty({ example: '2022-03-17 11:14:28' })
  validTill: string;

  @ApiProperty({ example: 20 })
  discount: number;

  @ApiProperty({ example: 1 })
  type: number; // 1 = Create 2 = Update 3 = deactivate if active / Activate if not active
}
