import { MasterRepo } from './master.repo';
import { ConnectDto } from './dtos/connect.dto';
import { CouponDto } from './dtos/coupon.dto';
import { Connect } from './entities/connect.entity';
import { Coupon } from './entities/coupon.entity';
import { Referral } from './entities/referral.entity';
export declare class MasterService {
    private readonly masterRepo;
    constructor(masterRepo: MasterRepo);
    getProfileRawData(): Promise<{
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
    }>;
    getCountries(): Promise<any>;
    getStates(countryId: number): Promise<any>;
    getCities(stateId: number): Promise<any>;
    getCountry(countryId: number): Promise<any>;
    getState(stateId: number): Promise<any>;
    getCity(cityId: number): Promise<any>;
    getConnectById(id: string): Promise<Connect>;
    getReferralById(id: string): Promise<Referral>;
    getCouponById(id: string): Promise<Coupon>;
    getCoupons(): Promise<Coupon[]>;
    getCoupon(couponCode: string): Promise<Coupon>;
    getReferrals(): Promise<Referral[]>;
    getConnects(): Promise<Connect[]>;
    craeteOrUpdateReferral(isActive: boolean, isReferralId: string): Promise<Referral>;
    craeteOrUpdateCoupon(couponDto: CouponDto): Promise<Coupon>;
    craeteOrUpdateConnect(connectDto: ConnectDto): Promise<Connect>;
}
