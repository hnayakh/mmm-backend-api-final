import { JwtService } from '@nestjs/jwt';
import { UserBasic } from '../user/entities/user-basic.entity';
import { UserService } from '../user/user.service';
import { CreateOtpDto, VerifyOtpDto } from './dtos/create-otp.dto';
import { AxiosService } from 'src/shared/services/axios.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private axiosService;
    constructor(userService: UserService, jwtService: JwtService, axiosService: AxiosService);
    sendVerificationEmail(email: string, userId: string): Promise<void>;
    verifyEmail(token: string): Promise<void>;
    validateUser(email: string, loginPassword: string, fireBaseToken: string): Promise<any>;
    validateSocialUser(email: string, providerId: string, socialAccessToken: string, fireBaseToken: string): Promise<any>;
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
        agoraToken: string;
        channelName: string;
        notificationId: string;
        name: string;
        receiverId: string;
        profileImage: string;
        status: string;
    } | {
        status: number;
        message: string;
        Message?: undefined;
    } | {
        Message: string;
        status?: undefined;
        message?: undefined;
    }>;
}
