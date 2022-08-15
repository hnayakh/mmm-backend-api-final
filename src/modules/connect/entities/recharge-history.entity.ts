import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { UserBasic } from 'src/modules/user/entities/user-basic.entity';
import { PaymentStatus } from 'src/shared/enums/miscellaneous.enum';

@Entity('recharge_history')
export class RechargeHistory extends AbstarctEntity {
  @Column()
  actualAmount: number;

  @Column()
  discountedAmount: number;

  @Column()
  isCouponApplied: boolean;

  @Column({ nullable: true })
  couponCode: string;

  @Column()
  connectCount: number;

  @Column()
  date: string;

  @Column()
  modeOfPayment: number;

  @Column()
  transactionId: string;

  @Column()
  paymentStatus: PaymentStatus;

  @Column()
  failureReason: string;

  @ManyToOne((type) => UserBasic, (userBasic) => userBasic.rechargeHistory)
  userBasic: UserBasic;

  static createRechargeHistory(
    actualAmount: number,
    discountedAmount: number,
    isCouponApplied: boolean,
    couponCode: string,
    connectCount: number,
    date: string,
    modeOfPayment: number,
    transactionId: string,
    paymentStatus: PaymentStatus,
    failureReason: string,
    userBasic: UserBasic,
  ) {
    const rh = new RechargeHistory();
    rh.actualAmount = actualAmount;
    rh.discountedAmount = discountedAmount;
    rh.isCouponApplied = isCouponApplied;
    rh.couponCode = couponCode;
    rh.connectCount = connectCount;
    (rh.date = date), (rh.modeOfPayment = modeOfPayment);
    rh.transactionId = transactionId;
    rh.paymentStatus = paymentStatus;
    rh.failureReason = failureReason;
    rh.userBasic = userBasic;
    return rh;
  }
}
