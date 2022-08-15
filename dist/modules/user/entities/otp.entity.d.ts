import { AbstarctEntity } from 'src/shared/entities/abstract.entity';
export declare class Otp extends AbstarctEntity {
    phoneNumber: string;
    email: string;
    otp: string;
    validTill: string;
    isVerified: boolean;
    static createOtp(phoneNumber: string, email: string, otp: string): Otp;
    updateStatus(): this;
    deactivate(): this;
}
