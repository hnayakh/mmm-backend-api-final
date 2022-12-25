import { JwtService } from '@nestjs/jwt';
import { UserBasic } from '../user/entities/user-basic.entity';
import { UserService } from '../user/user.service';
import { CreateOtpDto, VerifyOtpDto } from './dtos/create-otp.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, loginPassword: string, fireBaseToken: string): Promise<any>;
    private login;
    decodeToken(authToken: string): Promise<string | {
        [key: string]: any;
    }>;
    comparePassword(oldPassword: string, userPassword: string): Promise<void>;
    sendOtp(createOtpDto: CreateOtpDto): Promise<{
        otp: string;
        phoneNumber: string;
        email: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto, fireBaseToken: any): Promise<{
        userId: string;
        access_token: string;
        userBasic: UserBasic;
        requiredLoginDetails: any;
    } | {
        userId: any;
        access_token: any;
        userBasic: any;
    }>;
    validateAdminUser(email: string, loginPassword: string): Promise<any>;
    private adminLogin;
    generateAGoraToken(data: any): Promise<"Receiver Data not found" | {
        status: number;
        message: string;
        Message?: undefined;
    } | {
        Message: string;
        status?: undefined;
        message?: undefined;
    }>;
}
