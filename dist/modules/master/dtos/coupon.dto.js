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
exports.CouponDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
class CouponDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'couponId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' }),
    __metadata("design:type", String)
], CouponDto.prototype, "couponId", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'M2351' }),
    __metadata("design:type", String)
], CouponDto.prototype, "couponCode", void 0);
__decorate([
    swagger_1.ApiProperty({ example: miscellaneous_enum_1.DiscountType.Amount }),
    __metadata("design:type", Number)
], CouponDto.prototype, "discountType", void 0);
__decorate([
    swagger_1.ApiProperty({ example: '2022-03-17 11:14:28' }),
    __metadata("design:type", String)
], CouponDto.prototype, "validTill", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 20 }),
    __metadata("design:type", Number)
], CouponDto.prototype, "discount", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], CouponDto.prototype, "type", void 0);
exports.CouponDto = CouponDto;
//# sourceMappingURL=coupon.dto.js.map