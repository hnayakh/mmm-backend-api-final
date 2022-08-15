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
var Otp_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
let Otp = Otp_1 = class Otp extends abstract_entity_1.AbstarctEntity {
    static createOtp(phoneNumber, email, otp) {
        const otpObj = new Otp_1();
        otpObj.phoneNumber = phoneNumber;
        otpObj.otp = otp;
        otpObj.email = email;
        return otpObj;
    }
    updateStatus() {
        this.isVerified = true;
        return this;
    }
    deactivate() {
        this.isActive = false;
        return this;
    }
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Otp.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Otp.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Otp.prototype, "otp", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", String)
], Otp.prototype, "validTill", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Otp.prototype, "isVerified", void 0);
Otp = Otp_1 = __decorate([
    typeorm_1.Entity('otps')
], Otp);
exports.Otp = Otp;
//# sourceMappingURL=otp.entity.js.map