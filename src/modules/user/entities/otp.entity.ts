import { Column, Entity } from 'typeorm';
import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
import { add } from 'date-fns';

@Entity('otps')
export class Otp extends AbstarctEntity {
  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  otp: string;

  @Column({ type: 'timestamp' })
  validTill: string;

  @Column({ default: false })
  isVerified: boolean;

  static createOtp(phoneNumber: string, email: string, otp: string) {
    const otpObj = new Otp();
    otpObj.phoneNumber = phoneNumber;
    otpObj.otp = otp;
    otpObj.email = email;
    return otpObj;
  }

  updateStatus() {
    this.isVerified = true;
    return this;
  }

  deactivate() {
    this.isActive = false;
    return this;
  }
}
