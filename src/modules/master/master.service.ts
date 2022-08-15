import { Injectable } from '@nestjs/common';
import { castSubcaste } from 'src/shared/constants/profile-master-data/cast-subcaste';
import { religion } from 'src/shared/constants/profile-master-data/religion';
import { gothra } from 'src/shared/constants/profile-master-data/gothra';
import { occupation } from 'src/shared/constants/profile-master-data/occupation';
import { motherTongue } from 'src/shared/constants/profile-master-data/mother-tongue';
import { education } from 'src/shared/constants/profile-master-data/education';
import { postedBy } from 'src/shared/constants/profile-master-data/posted-by';
import { MasterRepo } from './master.repo';
import { ConnectDto } from './dtos/connect.dto';
import { CouponDto } from './dtos/coupon.dto';
import { Connect } from './entities/connect.entity';
import { Coupon } from './entities/coupon.entity';
import { Referral } from './entities/referral.entity';

@Injectable()
export class MasterService {
  constructor(private readonly masterRepo: MasterRepo) {}
  async getProfileRawData() {
    let profileRawData = {
      castSubCaste: castSubcaste,
      education: education,
      gothra: gothra,
      motherTongue: motherTongue,
      postedBy: postedBy,
      occupation: occupation,
      religion: religion,
    };
    return profileRawData;
  }

  async getCountries() {
    return this.masterRepo.getCountries();
  }

  async getStates(countryId: number) {
    return this.masterRepo.getStates(countryId);
  }

  async getCities(stateId: number) {
    return this.masterRepo.getCities(stateId);
  }

  async getCountry(countryId: number) {
    return await this.masterRepo.getCountry(countryId);
  }

  async getState(stateId: number) {
    return await this.masterRepo.getState(stateId);
  }

  async getCity(cityId: number) {
    return await this.masterRepo.getCity(cityId);
  }

  async getConnectById(id: string) {
    return await this.masterRepo.getConnectById(id);
  }

  async getReferralById(id: string) {
    return await this.masterRepo.getReferralById(id);
  }

  async getCouponById(id: string) {
    return await this.masterRepo.getCouponById(id);
  }

  async getCoupons() {
    return await this.masterRepo.getCoupons();
  }

  async getCoupon(couponCode: string) {
    return await this.masterRepo.getCoupon(couponCode);
  }

  async getReferrals() {
    return await this.masterRepo.getReferrals();
  }

  async getConnects() {
    return await this.masterRepo.getConnects();
  }

  async craeteOrUpdateReferral(isActive: boolean, isReferralId: string) {
    const referral = await this.masterRepo.getReferralById(isReferralId);
    if (referral == null) {
      const referralObj = Referral.createReferral();
      return await this.masterRepo.createReferral(referralObj);
    } else {
      referral.updateReferral(isActive);
      return await this.masterRepo.updateReferral(referral);
    }
  }

  async craeteOrUpdateCoupon(couponDto: CouponDto) {
    if (couponDto.type == 1) {
      const couponObj = Coupon.createCoupon(
        couponDto.couponCode,
        couponDto.discountType,
        couponDto.validTill,
        couponDto.discount,
      );
      return await this.masterRepo.createCoupon(couponObj);
    } else if (couponDto.type == 3) {
      const coupon = await this.masterRepo.getCouponById(couponDto.couponId);
      if (coupon.isActive == true) {
        coupon.activateOrDeativateCoupon(false);
      } else {
        coupon.activateOrDeativateCoupon(true);
      }
    } else {
      const coupon = await this.masterRepo.getCouponById(couponDto.couponId);
      coupon.updateCoupon(
        couponDto.couponCode,
        couponDto.discountType,
        couponDto.validTill,
        couponDto.discount,
      );
      return await this.masterRepo.updateCoupon(coupon);
    }
  }

  async craeteOrUpdateConnect(connectDto: ConnectDto) {
    if (connectDto.type == 1) {
      const connectObj = Connect.createConnect(
        connectDto.connectPrice,
        connectDto.discountType,
        connectDto.discount,
        connectDto.discountedPrice,
        connectDto.firstTimeBenifitMins,
        connectDto.secondTimeBenifitMins,
      );
      return await this.masterRepo.createConnect(connectObj);
    } else {
      const connect = await this.masterRepo.getConnectById(
        connectDto.connectId,
      );
      connect.updateConnect(
        connectDto.connectPrice,
        connectDto.discountType,
        connectDto.discount,
        connectDto.discountedPrice,
        connectDto.firstTimeBenifitMins,
        connectDto.secondTimeBenifitMins,
      );
      return await this.masterRepo.updateConnect(connect);
    }
  }
}
