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
exports.RechargeHistoryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
class RechargeHistoryDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'actualAmount can not be empty.' }),
    swagger_1.ApiProperty({ example: 100 }),
    __metadata("design:type", Number)
], RechargeHistoryDto.prototype, "actualAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'discountedAmount can not be empty.' }),
    swagger_1.ApiProperty({ example: 100 }),
    __metadata("design:type", Number)
], RechargeHistoryDto.prototype, "discountedAmount", void 0);
__decorate([
    swagger_1.ApiProperty({ example: true }),
    __metadata("design:type", Boolean)
], RechargeHistoryDto.prototype, "isCouponApplied", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'VGUGVDW56' }),
    __metadata("design:type", String)
], RechargeHistoryDto.prototype, "couponCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Amount can not be empty.' }),
    swagger_1.ApiProperty({ example: 100 }),
    __metadata("design:type", Number)
], RechargeHistoryDto.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Connect count can not be empty.' }),
    swagger_1.ApiProperty({ example: 2 }),
    __metadata("design:type", Number)
], RechargeHistoryDto.prototype, "connectCount", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Date can not be empty.' }),
    swagger_1.ApiProperty({ example: '1997-09-21' }),
    __metadata("design:type", String)
], RechargeHistoryDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Payment mode can not be empty.' }),
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], RechargeHistoryDto.prototype, "modeOfPayment", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'TransactionId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'a1b2-c3d4-e5f6B2C3-D4F6-G7H8' }),
    __metadata("design:type", String)
], RechargeHistoryDto.prototype, "transactionId", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'Not enough balance' }),
    __metadata("design:type", String)
], RechargeHistoryDto.prototype, "failureReason", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'User basicId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'a1b2-c3d4-e5f6B2C3-D4F6-G7H8' }),
    __metadata("design:type", String)
], RechargeHistoryDto.prototype, "userBasicId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Payment status can not be empty.' }),
    swagger_1.ApiProperty({ example: miscellaneous_enum_1.PaymentStatus.Success }),
    __metadata("design:type", Number)
], RechargeHistoryDto.prototype, "paymentStatus", void 0);
exports.RechargeHistoryDto = RechargeHistoryDto;
//# sourceMappingURL=recharge-history.dto.js.map