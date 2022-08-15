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
exports.VerifyOtpDto = exports.CreateOtpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
class CreateOtpDto {
}
__decorate([
    swagger_1.ApiProperty({ example: '+91' }),
    __metadata("design:type", String)
], CreateOtpDto.prototype, "countryCode", void 0);
__decorate([
    swagger_1.ApiProperty({ example: '9965498121' }),
    __metadata("design:type", String)
], CreateOtpDto.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiProperty({ example: miscellaneous_enum_1.OtpType.Login }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateOtpDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'rutuparna.rout@gmail.com' }),
    __metadata("design:type", String)
], CreateOtpDto.prototype, "email", void 0);
exports.CreateOtpDto = CreateOtpDto;
class VerifyOtpDto {
}
__decorate([
    swagger_1.ApiProperty({ example: '+91' }),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "countryCode", void 0);
__decorate([
    swagger_1.ApiProperty({ example: '9965498121' }),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiProperty({ example: miscellaneous_enum_1.OtpType.Login }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], VerifyOtpDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'rutuparna.rout@gmail.com' }),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({ example: '661921' }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "otp", void 0);
exports.VerifyOtpDto = VerifyOtpDto;
//# sourceMappingURL=create-otp.dto.js.map