import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class RechargeHistoryDto {
    actualAmount: number;
    discountedAmount: number;
    isCouponApplied: boolean;
    couponCode: string;
    amount: number;
    connectCount: number;
    date: string;
    modeOfPayment: number;
    transactionId: string;
    failureReason: string;
    userBasicId: string;
    paymentStatus: PaymentStatus;
}
