import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from 'src/modules/user/entities/user-basic.entity';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';
export declare class RechargeHistory extends AbstarctEntity {
    actualAmount: number;
    discountedAmount: number;
    isCouponApplied: boolean;
    couponCode: string;
    connectCount: number;
    date: string;
    modeOfPayment: number;
    transactionId: string;
    paymentStatus: PaymentStatus;
    failureReason: string;
    userBasic: UserBasic;
    static createRechargeHistory(actualAmount: number, discountedAmount: number, isCouponApplied: boolean, couponCode: string, connectCount: number, date: string, modeOfPayment: number, transactionId: string, paymentStatus: PaymentStatus, failureReason: string, userBasic: UserBasic): RechargeHistory;
}
