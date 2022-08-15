import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { DiscountType } from 'src/shared/enums/miscellaneous.enum';
export declare class Coupon extends AbstarctEntity {
    couponCode: string;
    discountType: DiscountType;
    validTill: string;
    discount: number;
    static createCoupon(couponCode: string, discountType: DiscountType, validTill: string, discount: number): Coupon;
    updateCoupon(couponCode: string, discountType: DiscountType, validTill: string, discount: number): this;
    activateOrDeativateCoupon(isActive: boolean): this;
}
