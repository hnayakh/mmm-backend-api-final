import { AuthService } from './auth.service';
import { CreateOtpDto, VerifyOtpDto } from './dtos/create-otp.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { SocialLoginDto } from './dtos/social-login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userLoginDto: UserLoginDto): Promise<{
        data: any;
        message: string;
    }>;
    socialLogin(userSocialLoginDto: SocialLoginDto): Promise<{
        data: any;
        message: string;
    }>;
    sendOtp(createOtpDto: CreateOtpDto): Promise<{
        data: {
            otp: string;
            phoneNumber: string;
            email: string;
        };
        message: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto, fireBaseToken: string): Promise<{
        data: {
            userId: string;
            access_token: string;
            userBasic: import("../user/entities/user-basic.entity").UserBasic;
            requiredLoginDetails: any;
        } | {
            userId: any;
            access_token: any;
            userBasic: any;
        };
        message: string;
    }>;
    adminLogin(userLoginDto: UserLoginDto): Promise<{
        data: any;
        message: string;
    }>;
    generateAGoraToken(data: any): Promise<{
        data: string | {
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
        };
        message: string;
    }>;
}
