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
exports.MasterService = void 0;
const common_1 = require("@nestjs/common");
const cast_subcaste_1 = require("../../shared/constants/profile-master-data/cast-subcaste");
const religion_1 = require("../../shared/constants/profile-master-data/religion");
const gothra_1 = require("../../shared/constants/profile-master-data/gothra");
const occupation_1 = require("../../shared/constants/profile-master-data/occupation");
const mother_tongue_1 = require("../../shared/constants/profile-master-data/mother-tongue");
const education_1 = require("../../shared/constants/profile-master-data/education");
const posted_by_1 = require("../../shared/constants/profile-master-data/posted-by");
const master_repo_1 = require("./master.repo");
const connect_entity_1 = require("./entities/connect.entity");
const coupon_entity_1 = require("./entities/coupon.entity");
const referral_entity_1 = require("./entities/referral.entity");
let MasterService = class MasterService {
    constructor(masterRepo) {
        this.masterRepo = masterRepo;
    }
    async getProfileRawData() {
        let profileRawData = {
            castSubCaste: cast_subcaste_1.castSubcaste,
            education: education_1.education,
            gothra: gothra_1.gothra,
            motherTongue: mother_tongue_1.motherTongue,
            postedBy: posted_by_1.postedBy,
            occupation: occupation_1.occupation,
            religion: religion_1.religion,
        };
        return profileRawData;
    }
    async getCountries() {
        return this.masterRepo.getCountries();
    }
    async getStates(countryId) {
        return this.masterRepo.getStates(countryId);
    }
    async getCities(stateId) {
        return this.masterRepo.getCities(stateId);
    }
    async getCountry(countryId) {
        return await this.masterRepo.getCountry(countryId);
    }
    async getState(stateId) {
        return await this.masterRepo.getState(stateId);
    }
    async getCity(cityId) {
        return await this.masterRepo.getCity(cityId);
    }
    async getConnectById(id) {
        return await this.masterRepo.getConnectById(id);
    }
    async getReferralById(id) {
        return await this.masterRepo.getReferralById(id);
    }
    async getCouponById(id) {
        return await this.masterRepo.getCouponById(id);
    }
    async getCoupons() {
        return await this.masterRepo.getCoupons();
    }
    async getCoupon(couponCode) {
        return await this.masterRepo.getCoupon(couponCode);
    }
    async getReferrals() {
        return await this.masterRepo.getReferrals();
    }
    async getConnects() {
        return await this.masterRepo.getConnects();
    }
    async craeteOrUpdateReferral(isActive, isReferralId) {
        const referral = await this.masterRepo.getReferralById(isReferralId);
        if (referral == null) {
            const referralObj = referral_entity_1.Referral.createReferral();
            return await this.masterRepo.createReferral(referralObj);
        }
        else {
            referral.updateReferral(isActive);
            return await this.masterRepo.updateReferral(referral);
        }
    }
    async craeteOrUpdateCoupon(couponDto) {
        if (couponDto.type == 1) {
            const couponObj = coupon_entity_1.Coupon.createCoupon(couponDto.couponCode, couponDto.discountType, couponDto.validTill, couponDto.discount);
            return await this.masterRepo.createCoupon(couponObj);
        }
        else if (couponDto.type == 3) {
            const coupon = await this.masterRepo.getCouponById(couponDto.couponId);
            if (coupon.isActive == true) {
                coupon.activateOrDeativateCoupon(false);
            }
            else {
                coupon.activateOrDeativateCoupon(true);
            }
        }
        else {
            const coupon = await this.masterRepo.getCouponById(couponDto.couponId);
            coupon.updateCoupon(couponDto.couponCode, couponDto.discountType, couponDto.validTill, couponDto.discount);
            return await this.masterRepo.updateCoupon(coupon);
        }
    }
    async craeteOrUpdateConnect(connectDto) {
        if (connectDto.type == 1) {
            const connectObj = connect_entity_1.Connect.createConnect(connectDto.connectPrice, connectDto.discountType, connectDto.discount, connectDto.discountedPrice, connectDto.firstTimeBenifitMins, connectDto.secondTimeBenifitMins);
            return await this.masterRepo.createConnect(connectObj);
        }
        else {
            const connect = await this.masterRepo.getConnectById(connectDto.connectId);
            connect.updateConnect(connectDto.connectPrice, connectDto.discountType, connectDto.discount, connectDto.discountedPrice, connectDto.firstTimeBenifitMins, connectDto.secondTimeBenifitMins);
            return await this.masterRepo.updateConnect(connect);
        }
    }
};
MasterService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [master_repo_1.MasterRepo])
], MasterService);
exports.MasterService = MasterService;
//# sourceMappingURL=master.service.js.map