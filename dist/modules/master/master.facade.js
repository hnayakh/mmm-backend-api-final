"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterFacade = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const axios_service_1 = require("../../shared/services/axios.service");
const user_service_1 = require("../user/user.service");
const master_service_1 = require("./master.service");
let MasterFacade = class MasterFacade {
    constructor(masterService, userService, axiosService) {
        this.masterService = masterService;
        this.userService = userService;
        this.axiosService = axiosService;
    }
    async getProfileRawData(userBasicId) {
        let userBasic = null;
        if (userBasicId != undefined) {
            userBasic = await this.userService.getUserBasicById(userBasicId);
        }
        const profileRawData = await this.masterService.getProfileRawData();
        let result = {
            userBasic: (userBasic === null || userBasic === void 0 ? void 0 : userBasic.activationStatus) == miscellaneous_enum_1.ActivationStatus.Verified
                ? userBasic
                : null,
            profileRawData: profileRawData,
        };
        return result;
    }
    async getCountries() {
        return this.masterService.getCountries();
    }
    async getStates(countryId) {
        return this.masterService.getStates(countryId);
    }
    async getCities(stateId) {
        return this.masterService.getCities(stateId);
    }
    async craeteOrUpdateConnect(connectDto) {
        return await this.masterService.craeteOrUpdateConnect(connectDto);
    }
    async craeteOrUpdateCoupon(couponDto) {
        return await this.masterService.craeteOrUpdateCoupon(couponDto);
    }
    async craeteOrUpdateReferral(isActive, referralId) {
        return await this.masterService.craeteOrUpdateReferral(isActive, referralId);
    }
    async getConnectById(id) {
        return await this.masterService.getConnectById(id);
    }
    async getReferralById(id) {
        return await this.masterService.getReferralById(id);
    }
    async getCouponById(id) {
        return await this.masterService.getCouponById(id);
    }
    async getCoupons() {
        let coupons = await this.masterService.getCoupons();
    }
    async getCoupon(couponCode) {
        const coupon = await this.masterService.getCoupon(couponCode);
        if (coupon == null) {
            throw new common_1.HttpException('No coupon found.', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return coupon;
    }
    async getReferrals() {
        return await this.masterService.getReferrals();
    }
    async getConnects() {
        return await this.masterService.getConnects();
    }
};
MasterFacade = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [master_service_1.MasterService,
        user_service_1.UserService,
        axios_service_1.AxiosService])
], MasterFacade);
exports.MasterFacade = MasterFacade;
//# sourceMappingURL=master.facade.js.map