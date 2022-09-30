import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ActivationStatus } from 'src/shared/enums/miscellaneous.enum';
import { AxiosService } from 'src/shared/services/axios.service';
import { UserService } from '../user/user.service';
import { ConnectDto } from './dtos/connect.dto';
import { CouponDto } from './dtos/coupon.dto';
import { MasterService } from './master.service';

@Injectable()
export class MasterFacade {
  constructor(
    private readonly masterService: MasterService,
    private readonly userService: UserService,
    private readonly axiosService: AxiosService,
  ) {}

  async getProfileRawData(userBasicId: string) {
    let userBasic = null;
    if (userBasicId != undefined) {
      userBasic = await this.userService.getUserBasicById(userBasicId);
    }

    const profileRawData = await this.masterService.getProfileRawData();
    let result = {
      userBasic:
        userBasic?.activationStatus == ActivationStatus.Verified
          ? userBasic
          : null,
      profileRawData: profileRawData,
    };
    return result;
  }

  async getCountries() {
    return this.masterService.getCountries();
  }

  async getStates(countryId: number) {
    return this.masterService.getStates(countryId);
  }

  async getCities(stateId: number) {
    return this.masterService.getCities(stateId);
  }

  async craeteOrUpdateConnect(connectDto: ConnectDto) {
    return await this.masterService.craeteOrUpdateConnect(connectDto);
  }

  async craeteOrUpdateCoupon(couponDto: CouponDto) {
    return await this.masterService.craeteOrUpdateCoupon(couponDto);
  }

  async craeteOrUpdateReferral(isActive: boolean, referralId: string) {
    return await this.masterService.craeteOrUpdateReferral(
      isActive,
      referralId,
    );
  }

  async getConnectById(id: string) {
    return await this.masterService.getConnectById(id);
  }

  async getReferralById(id: string) {
    return await this.masterService.getReferralById(id);
  }

  async getCouponById(id: string) {
    return await this.masterService.getCouponById(id);
  }

  async getCoupons() {
    let coupons = await this.masterService.getCoupons();
    return coupons;
  }

  async getCoupon(couponCode: string) {
    const coupon = await this.masterService.getCoupon(couponCode);
    if (coupon == null) {
      throw new HttpException(
        'No coupon found.',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return coupon;
  }

  async getReferrals() {
    return await this.masterService.getReferrals();
  }

  async getConnects() {
    return await this.masterService.getConnects();
  }
}
