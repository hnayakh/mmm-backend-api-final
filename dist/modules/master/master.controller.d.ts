import { ConnectDto } from './dtos/connect.dto';
import { CouponDto } from './dtos/coupon.dto';
import { MasterFacade } from './master.facade';
export declare class MasterController {
    private readonly masterFacade;
    constructor(masterFacade: MasterFacade);
    getProfileRawData(userBasicId: string): Promise<{
        data: {
            userBasic: any;
            profileRawData: {
                castSubCaste: {
                    cast: string;
                    subCaste: string[];
                }[];
                education: {
                    id: string;
                    text: string;
                    fullform: string;
                }[];
                gothra: string[];
                motherTongue: {
                    id: string;
                    text: string;
                }[];
                postedBy: {
                    id: string;
                    text: string;
                }[];
                occupation: {
                    category: string;
                    subCategory: {
                        id: string;
                        text: string;
                    }[];
                }[];
                religion: {
                    id: string;
                    text: string;
                }[];
            };
        };
        message: string;
    }>;
    getCountries(): Promise<{
        data: any;
        message: string;
    }>;
    getStates(countryId: number): Promise<{
        data: any;
        message: string;
    }>;
    getCities(stateId: number): Promise<{
        data: any;
        message: string;
    }>;
    craeteOrUpdateConnect(connectDto: ConnectDto): Promise<{
        data: import("./entities/connect.entity").Connect;
        message: string;
    }>;
    craeteOrUpdateCoupon(couponDto: CouponDto): Promise<{
        data: import("./entities/coupon.entity").Coupon;
        message: string;
    }>;
    craeteOrUpdateReferralt(isActive: boolean, referralId: string): Promise<{
        data: import("./entities/referral.entity").Referral;
        message: string;
    }>;
    getConnects(): Promise<{
        data: import("./entities/connect.entity").Connect[];
        message: string;
    }>;
    getConnectById(connectid: string): Promise<{
        data: import("./entities/connect.entity").Connect;
        message: string;
    }>;
    getCoupons(): Promise<{
        data: import("./entities/coupon.entity").Coupon[];
        message: string;
    }>;
    getCoupon(couponCode: string): Promise<{
        data: import("./entities/coupon.entity").Coupon;
        message: string;
    }>;
    getReferrals(): Promise<{
        data: import("./entities/referral.entity").Referral[];
        message: string;
    }>;
}
