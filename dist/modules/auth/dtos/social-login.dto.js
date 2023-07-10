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
exports.SocialLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SocialLoginDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 'rutuparna.rout@gmail.com' }),
    __metadata("design:type", String)
], SocialLoginDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'jwjeifnn2322jfjfnjwnffe22f232ef232wefwnfjwnf' }),
    __metadata("design:type", String)
], SocialLoginDto.prototype, "socialProviderId", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'Password@123' }),
    __metadata("design:type", String)
], SocialLoginDto.prototype, "socailAccessToken", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'Password@123' }),
    __metadata("design:type", String)
], SocialLoginDto.prototype, "fireBaseToken", void 0);
exports.SocialLoginDto = SocialLoginDto;
//# sourceMappingURL=social-login.dto.js.map