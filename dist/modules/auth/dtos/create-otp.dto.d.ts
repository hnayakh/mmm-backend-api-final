import { OtpType } from 'src/shared/enums/miscellaneous.enum';
export declare class CreateOtpDto {
    countryCode?: string;
    phoneNumber?: string;
    type: OtpType;
    email?: string;
}
export declare class VerifyOtpDto {
    countryCode?: string;
    phoneNumber?: string;
    type: OtpType;
    email?: string;
    otp: string;
}
