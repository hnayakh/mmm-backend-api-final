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
var RechargeHistory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RechargeHistory = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("../../user/entities/user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let RechargeHistory = RechargeHistory_1 = class RechargeHistory extends abstract_entity_1.AbstarctEntity {
    static createRechargeHistory(actualAmount, discountedAmount, isCouponApplied, couponCode, connectCount, date, modeOfPayment, transactionId, paymentStatus, failureReason, userBasic) {
        const rh = new RechargeHistory_1();
        rh.actualAmount = actualAmount;
        rh.discountedAmount = discountedAmount;
        rh.isCouponApplied = isCouponApplied;
        rh.couponCode = couponCode;
        rh.connectCount = connectCount;
        (rh.date = date), (rh.modeOfPayment = modeOfPayment);
        rh.transactionId = transactionId;
        rh.paymentStatus = paymentStatus;
        rh.failureReason = failureReason;
        rh.userBasic = userBasic;
        return rh;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RechargeHistory.prototype, "actualAmount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RechargeHistory.prototype, "discountedAmount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], RechargeHistory.prototype, "isCouponApplied", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], RechargeHistory.prototype, "couponCode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RechargeHistory.prototype, "connectCount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RechargeHistory.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RechargeHistory.prototype, "modeOfPayment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RechargeHistory.prototype, "transactionId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RechargeHistory.prototype, "paymentStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RechargeHistory.prototype, "failureReason", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.rechargeHistory),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], RechargeHistory.prototype, "userBasic", void 0);
RechargeHistory = RechargeHistory_1 = __decorate([
    typeorm_1.Entity('recharge_history')
], RechargeHistory);
exports.RechargeHistory = RechargeHistory;
//# sourceMappingURL=recharge-history.entity.js.map