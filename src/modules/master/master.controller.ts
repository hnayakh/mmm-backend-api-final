import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConnectDto } from './dtos/connect.dto';
import { CouponDto } from './dtos/coupon.dto';
import { MasterFacade } from './master.facade';

@ApiTags('Master')
@Controller('masters')
export class MasterController {
  constructor(private readonly masterFacade: MasterFacade) {}

  @ApiQuery({ name: 'userBasicId', required: false })
  @Get('profile-raw-data')
  async getProfileRawData(@Query('userBasicId') userBasicId: string) {
    const result = await this.masterFacade.getProfileRawData(userBasicId);
    return { data: result, message: 'User profile raw data fetched.' };
  }

  @Get('countries')
  async getCountries() {
    const result = await this.masterFacade.getCountries();
    return { data: result, message: 'Countries fetched successfully.' };
  }

  @Get('states/:countryId')
  async getStates(@Param('countryId') countryId: number) {
    const result = await this.masterFacade.getStates(countryId);
    return { data: result, message: 'States fetched successfully.' };
  }

  @Get('cities/:stateId')
  async getCities(@Param('stateId') stateId: number) {
    const result = await this.masterFacade.getCities(stateId);
    return { data: result, message: 'Cities fetched successfully.' };
  }

  @Post('connect')
  async craeteOrUpdateConnect(@Body() connectDto: ConnectDto) {
    const connect = await this.masterFacade.craeteOrUpdateConnect(connectDto);
    return { data: connect, message: 'Operation successfully completed.' };
  }

  @Post('coupon')
  async craeteOrUpdateCoupon(@Body() couponDto: CouponDto) {
    const coupon = await this.masterFacade.craeteOrUpdateCoupon(couponDto);
    return { data: coupon, message: 'Operation successfully completed.' };
  }

  @ApiQuery({ name: 'isActive', required: true })
  @ApiQuery({ name: 'referralId', required: true })
  @Post('referral')
  async craeteOrUpdateReferralt(
    @Query('isActive') isActive: boolean,
    @Query('referralId') referralId: string,
  ) {
    const referral = await this.masterFacade.craeteOrUpdateReferral(
      isActive,
      referralId,
    );
    return { data: referral, message: 'Operation successfully completed.' };
  }

  @Get('connects')
  async getConnects() {
    const result = await this.masterFacade.getConnects();
    return { data: result, message: 'Results fetched successfully.' };
  }

  @Get('coupons')
  async getCoupons() {
    const result = await this.masterFacade.getCoupons();
    return { data: result, message: 'Results fetched successfully.' };
  }

  @Get('coupons/:couponCode')
  async getCoupon(@Param('couponCode') couponCode: string) {
    const result = await this.masterFacade.getCoupon(couponCode);
    return { data: result, message: 'Results fetched successfully.' };
  }

  @Get('referrals')
  async getReferrals() {
    const result = await this.masterFacade.getReferrals();
    return { data: result, message: 'Results fetched successfully.' };
  }
}
