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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const connect_dto_1 = require("./dtos/connect.dto");
const coupon_dto_1 = require("./dtos/coupon.dto");
const master_facade_1 = require("./master.facade");
let MasterController = class MasterController {
    constructor(masterFacade) {
        this.masterFacade = masterFacade;
    }
    async getProfileRawData(userBasicId) {
        const result = await this.masterFacade.getProfileRawData(userBasicId);
        return { data: result, message: 'User profile raw data fetched.' };
    }
    async getCountries() {
        const result = await this.masterFacade.getCountries();
        return { data: result, message: 'Countries fetched successfully.' };
    }
    async getStates(countryId) {
        const result = await this.masterFacade.getStates(countryId);
        return { data: result, message: 'States fetched successfully.' };
    }
    async getCities(stateId) {
        const result = await this.masterFacade.getCities(stateId);
        return { data: result, message: 'Cities fetched successfully.' };
    }
    async craeteOrUpdateConnect(connectDto) {
        const connect = await this.masterFacade.craeteOrUpdateConnect(connectDto);
        return { data: connect, message: 'Operation successfully completed.' };
    }
    async craeteOrUpdateCoupon(couponDto) {
        const coupon = await this.masterFacade.craeteOrUpdateCoupon(couponDto);
        return { data: coupon, message: 'Operation successfully completed.' };
    }
    async craeteOrUpdateReferralt(isActive, referralId) {
        const referral = await this.masterFacade.craeteOrUpdateReferral(isActive, referralId);
        return { data: referral, message: 'Operation successfully completed.' };
    }
    async getConnects() {
        const result = await this.masterFacade.getConnects();
        return { data: result, message: 'Results fetched successfully.' };
    }
    async getConnectById(connectid) {
        const result = await this.masterFacade.getConnectById(connectid);
        return { data: result, message: 'Results fetched successfully.' };
    }
    async getCoupons() {
        const result = await this.masterFacade.getCoupons();
        return { data: result, message: 'Results fetched successfully.' };
    }
    async getCoupon(couponCode) {
        const result = await this.masterFacade.getCoupon(couponCode);
        return { data: result, message: 'Results fetched successfully.' };
    }
    async getReferrals() {
        const result = await this.masterFacade.getReferrals();
        return { data: result, message: 'Results fetched successfully.' };
    }
};
__decorate([
    swagger_1.ApiQuery({ name: 'userBasicId', required: false }),
    common_1.Get('profile-raw-data'),
    __param(0, common_1.Query('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getProfileRawData", null);
__decorate([
    common_1.Get('countries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getCountries", null);
__decorate([
    common_1.Get('states/:countryId'),
    __param(0, common_1.Param('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getStates", null);
__decorate([
    common_1.Get('cities/:stateId'),
    __param(0, common_1.Param('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getCities", null);
__decorate([
    common_1.Post('connect'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [connect_dto_1.ConnectDto]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "craeteOrUpdateConnect", null);
__decorate([
    common_1.Post('coupon'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.CouponDto]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "craeteOrUpdateCoupon", null);
__decorate([
    swagger_1.ApiQuery({ name: 'isActive', required: true }),
    swagger_1.ApiQuery({ name: 'referralId', required: true }),
    common_1.Post('referral'),
    __param(0, common_1.Query('isActive')),
    __param(1, common_1.Query('referralId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "craeteOrUpdateReferralt", null);
__decorate([
    common_1.Get('connects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getConnects", null);
__decorate([
    common_1.Get('connect/:connectid'),
    __param(0, common_1.Param('connectid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getConnectById", null);
__decorate([
    common_1.Get('coupons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getCoupons", null);
__decorate([
    common_1.Get('coupons/:couponCode'),
    __param(0, common_1.Param('couponCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getCoupon", null);
__decorate([
    common_1.Get('referrals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MasterController.prototype, "getReferrals", null);
MasterController = __decorate([
    swagger_1.ApiTags('Master'),
    common_1.Controller('masters'),
    __metadata("design:paramtypes", [master_facade_1.MasterFacade])
], MasterController);
exports.MasterController = MasterController;
//# sourceMappingURL=master.controller.js.map