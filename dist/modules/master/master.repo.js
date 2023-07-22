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
exports.MasterRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const connect_entity_1 = require("./entities/connect.entity");
const coupon_entity_1 = require("./entities/coupon.entity");
const referral_entity_1 = require("./entities/referral.entity");
let MasterRepo = class MasterRepo {
    constructor(connectRepo, couponRepo, referralRepo) {
        this.connectRepo = connectRepo;
        this.couponRepo = couponRepo;
        this.referralRepo = referralRepo;
    }
    async getCountries() {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT * FROM countries;`;
        const countries = await entityManager.query(rawQuery);
        return countries;
    }
    async getStates(countryId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT * FROM states s WHERE s.countryId = ${countryId};`;
        const states = await entityManager.query(rawQuery);
        return states;
    }
    async getCities(stateId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT * FROM cities c WHERE c.stateId = ${stateId};`;
        const cities = await entityManager.query(rawQuery);
        return cities;
    }
    async getCountry(countryId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT * FROM countries WHERE id = ${countryId}`;
        const countries = await entityManager.query(rawQuery);
        return countries[0];
    }
    async getState(stateId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT * FROM states s WHERE s.id = ${stateId};`;
        const states = await entityManager.query(rawQuery);
        return states[0];
    }
    async getCity(cityId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT * FROM cities c WHERE c.id = ${cityId};`;
        const cities = await entityManager.query(rawQuery);
        return cities[0];
    }
    async getConnectById(id) {
        return await this.connectRepo.findOne(id);
    }
    async getReferralById(id) {
        return await this.referralRepo.findOne(id);
    }
    async getCouponById(id) {
        return await this.couponRepo.findOne(id);
    }
    async createConnect(connectObj) {
        return await this.connectRepo.save(connectObj);
    }
    async createCoupon(couponObj) {
        return await this.couponRepo.save(couponObj);
    }
    async createReferral(referralObj) {
        return await this.referralRepo.save(referralObj);
    }
    async updateConnect(connectObj) {
        return await this.connectRepo.save(Object.assign({}, connectObj));
    }
    async updateCoupon(couponObj) {
        return await this.couponRepo.save(Object.assign({}, couponObj));
    }
    async deleteCoupon(couponObj) {
        return await this.couponRepo.delete(couponObj);
    }
    async getReferrals() {
        return await this.referralRepo.find();
    }
    async getConnects() {
        return await this.connectRepo.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async getCoupons() {
        return await this.couponRepo.find({
            where: {
                isActive: 1
            }
        });
    }
    async getCoupon(couponCode) {
        return await this.couponRepo.findOne({ where: { couponCode: couponCode } });
    }
    async updateReferral(referralObj) {
        return await this.referralRepo.save(Object.assign({}, referralObj));
    }
};
MasterRepo = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(connect_entity_1.Connect)),
    __param(1, typeorm_1.InjectRepository(coupon_entity_1.Coupon)),
    __param(2, typeorm_1.InjectRepository(referral_entity_1.Referral)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MasterRepo);
exports.MasterRepo = MasterRepo;
//# sourceMappingURL=master.repo.js.map