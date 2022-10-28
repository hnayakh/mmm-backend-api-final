import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';

@Entity('coupons')
export class Coupon extends AbstarctEntity {
  @Column()
  couponCode: string;

  @Column()
  discountType: DiscountType;

  @Column({ type: 'timestamp' })  
  validTill: string;

  @Column()
  discount: number;

  static createCoupon(
    couponCode: string,
    discountType: DiscountType,
    validTill: string,
    discount: number,
  ) {
    const couponObj = new Coupon();
    couponObj.couponCode = couponCode;
    couponObj.discountType = discountType;
    couponObj.validTill = validTill;
    couponObj.discount = discount;
    return couponObj;
  }

  updateCoupon(
    couponCode: string,
    discountType: DiscountType,
    validTill: string,
    discount: number,
  ) {
    this.couponCode = couponCode;
    this.discountType = discountType;
    this.validTill = validTill;
    this.discount = discount;
    return this;
  }

  activateOrDeativateCoupon(isActive: boolean) {
    this.isActive = isActive;
    return this;
  }
}
