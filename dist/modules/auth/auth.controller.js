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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const create_otp_dto_1 = require("./dtos/create-otp.dto");
const user_login_dto_1 = require("./dtos/user-login.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(userLoginDto) {
        const result = await this.authService.validateUser(userLoginDto.email, userLoginDto.password, userLoginDto.fireBaseToken);
        return { data: result, message: 'User logged in successfully.' };
    }
    async sendOtp(createOtpDto) {
        const result = await this.authService.sendOtp(createOtpDto);
        return { data: result, message: 'Otp sent succssfully.' };
    }
    async verifyOtp(verifyOtpDto, fireBaseToken) {
        const result = await this.authService.verifyOtp(verifyOtpDto, fireBaseToken);
        return { data: result, message: 'Otp verified successfully.' };
    }
    async adminLogin(userLoginDto) {
        const result = await this.authService.validateAdminUser(userLoginDto.email, userLoginDto.password);
        return { data: result, message: 'User logged in successfully.' };
    }
    async generateAGoraToken(data) {
        console.log('data', data);
        const result = await this.authService.generateAGoraToken(data);
        console.log(result);
        return { data: result, message: 'successfully.' };
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('sendOtp'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_otp_dto_1.CreateOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtp", null);
__decorate([
    common_1.Post('verifyOtp'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_otp_dto_1.VerifyOtpDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    common_1.Post('admin/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    common_1.Post('generateAGoraToken'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateAGoraToken", null);
AuthController = __decorate([
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map