import { AxiosService } from 'src/shared/services/axios.service';
import { UserService } from '../user/user.service';
import { ConnectDto } from './dtos/connect.dto';
import { CouponDto } from './dtos/coupon.dto';
import { MasterService } from './master.service';
export declare class MasterFacade {
    private readonly masterService;
    private readonly userService;
    private readonly axiosService;
    constructor(masterService: MasterService, userService: UserService, axiosService: AxiosService);
    getProfileRawData(userBasicId: string): Promise<{
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
    }>;
    getCountries(): Promise<any>;
    getStates(countryId: number): Promise<any>;
    getCities(stateId: number): Promise<any>;
    craeteOrUpdateConnect(connectDto: ConnectDto): Promise<import("./entities/connect.entity").Connect>;
    craeteOrUpdateCoupon(couponDto: CouponDto): Promise<import("./entities/coupon.entity").Coupon>;
    craeteOrUpdateReferral(isActive: boolean, referralId: string): Promise<import("./entities/referral.entity").Referral>;
    getConnectById(id: string): Promise<import("./entities/connect.entity").Connect>;
    getReferralById(id: string): Promise<import("./entities/referral.entity").Referral>;
    getCouponById(id: string): Promise<import("./entities/coupon.entity").Coupon>;
    getCoupons(): Promise<import("./entities/coupon.entity").Coupon[]>;
    getCoupon(couponCode: string): Promise<import("./entities/coupon.entity").Coupon>;
    getReferrals(): Promise<import("./entities/referral.entity").Referral[]>;
    getConnects(): Promise<import("./entities/connect.entity").Connect[]>;
}
