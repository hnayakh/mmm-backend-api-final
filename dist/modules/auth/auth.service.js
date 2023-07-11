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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, loginPassword, fireBaseToken) {
        const user = await this.userService.getUserBasicByEmail(email.toLowerCase());
        if (user == null || user == undefined) {
            throw new common_1.HttpException('Invalid email or password.', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!user.isActive) {
            throw new common_1.HttpException('User is blocked. Please contact admin.', common_1.HttpStatus.UNAUTHORIZED);
        }
        const match = await bcrypt.compare(loginPassword, user.password);
        if (!match) {
            throw new common_1.HttpException('Invalid email or password.', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        const requiredLoginDetails = await this.userService.getRequiredLoginDetails(user.id);
        return await this.login(user, requiredLoginDetails, fireBaseToken);
    }
    async validateSocialUser(email, providerId, socialAccessToken, fireBaseToken) {
        const user = await this.userService.getUserBasicByEmail(email.toLowerCase());
        if (user == null || user == undefined) {
            throw new common_1.HttpException('Invalid email or password.', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!user.isActive) {
            throw new common_1.HttpException('User is blocked. Please contact admin.', common_1.HttpStatus.UNAUTHORIZED);
        }
        const requiredLoginDetails = await this.userService.getRequiredLoginDetails(user.id);
        return await this.login(user, requiredLoginDetails, fireBaseToken);
    }
    async login(user, requiredLoginDetails, fireBaseToken) {
        const payload = { username: user.email, sub: user.id };
        let authToken = this.jwtService.sign(payload);
        this.userService.createUserLogin('M', '12e34', authToken, user);
        this.userService.updateTokenToUserBasic(fireBaseToken, user.id);
        return {
            userId: user.id,
            access_token: authToken,
            userBasic: user,
            requiredLoginDetails,
        };
    }
    async decodeToken(authToken) {
        const token = authToken.replace('Bearer ', '');
        const decodedToken = this.jwtService.decode(token);
        return decodedToken;
    }
    async comparePassword(oldPassword, userPassword) {
        const match = await bcrypt.compare(oldPassword, userPassword);
        if (!match) {
            throw new common_1.HttpException('Password does not match.', common_1.HttpStatus.EXPECTATION_FAILED);
        }
    }
    async sendOtp(createOtpDto) {
        const otp = '123456';
        if (createOtpDto.type == miscellaneous_enum_1.OtpType.Registration) {
            const userBasicByEmail = await this.userService.getUserBasicByEmail(createOtpDto.email);
            if (userBasicByEmail) {
                throw new common_1.HttpException('Email already registered.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            const userBasicByPhone = await this.userService.getUserBasicByPhone(createOtpDto.phoneNumber);
            if (userBasicByPhone) {
                throw new common_1.HttpException('Phone number is already registered.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            await this.userService.createOtp(createOtpDto.email, createOtpDto.phoneNumber, otp);
            return {
                otp: otp,
                phoneNumber: createOtpDto.phoneNumber,
                email: createOtpDto.email,
            };
        }
        else if (createOtpDto.type == miscellaneous_enum_1.OtpType.Login) {
            const userBasicByPhone = await this.userService.getUserBasicByPhone(createOtpDto.phoneNumber);
            if (!userBasicByPhone) {
                throw new common_1.HttpException('Kindly register before logging in.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            await this.userService.createOtp(createOtpDto.email, createOtpDto.phoneNumber, otp);
            return {
                otp: otp,
                phoneNumber: createOtpDto.phoneNumber,
                email: createOtpDto.email,
            };
        }
        else {
            const userBasicByEmail = await this.userService.getUserBasicByEmail(createOtpDto.email);
            if (!userBasicByEmail) {
                throw new common_1.HttpException('Kindly register before logging in.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            await this.userService.createOtp(createOtpDto.email, createOtpDto.phoneNumber, otp);
            return {
                otp: otp,
                phoneNumber: createOtpDto.phoneNumber,
                email: createOtpDto.email,
            };
        }
    }
    async verifyOtp(verifyOtpDto, fireBaseToken) {
        if (verifyOtpDto.type == miscellaneous_enum_1.OtpType.Registration) {
            const sentOtp = await this.userService.getOtpForVerification(verifyOtpDto.phoneNumber, null);
            if (!sentOtp) {
                throw new common_1.HttpException('Try again.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            if (sentOtp.otp != verifyOtpDto.otp ||
                new Date() > new Date(sentOtp.validTill)) {
                throw new common_1.HttpException('Invalid OTP. Try again.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            this.userService.updateOtpStatus(verifyOtpDto.phoneNumber, verifyOtpDto.email, verifyOtpDto.otp);
            return {
                userId: null,
                access_token: null,
                userBasic: null,
            };
        }
        else if (verifyOtpDto.type == miscellaneous_enum_1.OtpType.Login) {
            const sentOtp = await this.userService.getOtpForVerification(verifyOtpDto.phoneNumber, null);
            if (!sentOtp) {
                throw new common_1.HttpException('Try again.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            if (sentOtp.otp != verifyOtpDto.otp ||
                new Date() > new Date(sentOtp.validTill)) {
                throw new common_1.HttpException('Invalid OTP. Try again.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            const userBasic = await this.userService.getUserBasicByPhone(verifyOtpDto.phoneNumber);
            this.userService.updateOtpStatus(verifyOtpDto.phoneNumber, verifyOtpDto.email, verifyOtpDto.otp);
            const requiredLoginDetails = await this.userService.getRequiredLoginDetails(userBasic.id);
            return this.login(userBasic, requiredLoginDetails, fireBaseToken);
        }
        else {
            const sentOtp = await this.userService.getOtpForVerification(null, verifyOtpDto.email);
            if (!sentOtp) {
                throw new common_1.HttpException('Try again.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            if (sentOtp.otp != verifyOtpDto.otp ||
                new Date() > new Date(sentOtp.validTill)) {
                throw new common_1.HttpException('Invalid OTP. Try again.', common_1.HttpStatus.EXPECTATION_FAILED);
            }
            const userBasic = await this.userService.getUserBasicByEmail(verifyOtpDto.email);
            this.userService.updateOtpStatus(verifyOtpDto.phoneNumber, verifyOtpDto.email, verifyOtpDto.otp);
            const requiredLoginDetails = await this.userService.getRequiredLoginDetails(userBasic.id);
            return this.login(userBasic, requiredLoginDetails, fireBaseToken);
        }
    }
    async validateAdminUser(email, loginPassword) {
        const adminUser = await this.userService.getAdminUserByEmail(email.toLowerCase());
        if (adminUser == null || adminUser == undefined) {
            throw new common_1.HttpException('Invalid email or password.', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!adminUser.isActive) {
            throw new common_1.HttpException('User is blocked. Please contact admin.', common_1.HttpStatus.UNAUTHORIZED);
        }
        const match = await bcrypt.compare(loginPassword, adminUser.password);
        if (!match) {
            throw new common_1.HttpException('Invalid email or password.', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return await this.adminLogin(adminUser);
    }
    async adminLogin(adminUser) {
        const payload = {
            username: adminUser.email,
            sub: adminUser.id,
            role: adminUser.role,
        };
        let authToken = this.jwtService.sign(payload);
        return {
            userId: adminUser.id,
            access_token: authToken,
            adminUser: adminUser,
        };
    }
    async generateAGoraToken(data) {
        return await this.userService.generateAGoraToken(data);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map