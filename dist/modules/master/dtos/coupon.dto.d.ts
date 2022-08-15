import { DiscountType } from 'src/shared/enums/miscellaneous.enum';
export declare class CouponDto {
    couponId: string;
    couponCode: string;
    discountType: DiscountType;
    validTill: string;
    discount: number;
    type: number;
}
