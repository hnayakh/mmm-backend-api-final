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
var Coupon_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let Coupon = Coupon_1 = class Coupon extends abstract_entity_1.AbstarctEntity {
    static createCoupon(couponCode, discountType, validTill, discount) {
        const couponObj = new Coupon_1();
        couponObj.couponCode = couponCode;
        couponObj.discountType = discountType;
        couponObj.validTill = validTill;
        couponObj.discount = discount;
        return couponObj;
    }
    updateCoupon(couponCode, discountType, validTill, discount) {
        this.couponCode = couponCode;
        this.discountType = discountType;
        this.validTill = validTill;
        this.discount = discount;
        return this;
    }
    activateOrDeativateCoupon(isActive) {
        this.isActive = isActive;
        return this;
    }
};
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "couponCode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Coupon.prototype, "discountType", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", String)
], Coupon.prototype, "validTill", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Coupon.prototype, "discount", void 0);
Coupon = Coupon_1 = __decorate([
    typeorm_1.Entity('coupons')
], Coupon);
exports.Coupon = Coupon;
//# sourceMappingURL=coupon.entity.js.map