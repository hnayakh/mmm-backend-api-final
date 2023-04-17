import { ProfileUpdationStatus, RegistrationSteps } from 'src/shared/enums/miscellaneous.enum';
import { CreateUserReligionDto } from './dtos/craete-user-religion.dto';
import { CreateAdminUserDto } from './dtos/create-admin-user.dto';
import { CreateUserAboutDto } from './dtos/create-user-about.dto';
import { CreateUserBasicDto } from './dtos/create-user-basic.dto';
import { CreateUserBioImageDto, UpdateUserDocsDto } from './dtos/create-user-bio-image.dto';
import { CreateUserCareerDto } from './dtos/create-user-career.dto';
import { CreateUserFamilyBgDto } from './dtos/create-user-familybg.dto';
import { CreateUserFamilyDDto } from './dtos/create-user-familyd.dto';
import { CreateUserHabitDto } from './dtos/create-user-habit.dto';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { AdminUser } from './entities/admin-user.entity';
import { Otp } from './entities/otp.entity';
import { UserAbout } from './entities/user-about.entity';
import { UserBasic } from './entities/user-basic.entity';
import { UserBio } from './entities/user-bio.entity';
import { UserCareer } from './entities/user-career.entity';
import { UserDocs } from './entities/user-docs.entity';
import { UserFamilyBackground } from './entities/user-family-background.entity';
import { UserFamilyDetail } from './entities/user-family-detail.entity';
import { UserHabit } from './entities/user-habit.entity';
import { UserImage } from './entities/user-image.entity';
import { UserLogin } from './entities/user-login.entity';
import { UserPreference } from './entities/user-preference.entity';
import { UserReligion } from './entities/user-religion.entity';
import { UserRepo } from './user.repo';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateUserLifestyleDto } from './dtos/create-user-lifestyle.dto';
import { UserLifestyle } from './entities/user-lifestyle.entity';
import { CreateUserHobbiesDto } from './dtos/create-user-hobbies.dto';
import { UserHobbies } from './entities/user-hobbies.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepo;
    private jwtService;
    private readonly notificationRepo;
    constructor(userRepo: UserRepo, jwtService: JwtService, notificationRepo: Repository<Notification>);
    getAllUsers(skip: string, take: string): Promise<UserBasic[]>;
    getUsersByIds(userBasicIds: string[]): Promise<any>;
    getAllNotification(userBasicId: string): Promise<Notification[]>;
    createUserBasic(fireBaseToken: any, createUserBasicDto: CreateUserBasicDto): Promise<UserBasic>;
    getUserBasicById(userBasicId: string): Promise<UserBasic>;
    createUserAbout(userBasic: UserBasic, createUserAboutDto: CreateUserAboutDto): Promise<any>;
    createUserHabit(userBasic: UserBasic, createUserHabitDto: CreateUserHabitDto): Promise<any>;
    createUserLifestyle(userBasic: UserBasic, createUserLifestyleDto: CreateUserLifestyleDto): Promise<any>;
    createUserHobbies(userBasic: UserBasic, createUserHobbiesDto: CreateUserHobbiesDto): Promise<any>;
    createUserFamilyDetail(userBasic: UserBasic, createUserFamilyDDto: CreateUserFamilyDDto): Promise<any>;
    createUserFamilyBackground(userBasic: UserBasic, createUserFamilyBgDto: CreateUserFamilyBgDto): Promise<any>;
    createUserCareer(userBasic: UserBasic, createUserCareerDto: CreateUserCareerDto): Promise<any>;
    createUserReligion(userBasic: UserBasic, createUserReligionDto: CreateUserReligionDto): Promise<any>;
    createUserBioWithImages(userBasic: UserBasic, createUserBioImageDto: CreateUserBioImageDto): Promise<any>;
    updateUserBioWithDocs(userBasic: UserBasic, createUserBioImageDto: UpdateUserDocsDto): Promise<void>;
    getUserBasicByEmail(email: string): Promise<UserBasic>;
    getUserBasicByPhone(phoneNumber: string): Promise<UserBasic>;
    createUserLogin(deviceType: string, deviceId: string, authToken: string, userBasic: UserBasic): Promise<UserLogin>;
    createOtp(email: string, phoneNumber: string, otp: string): Promise<Otp>;
    updateOtpStatus(phoneNumber: string, email: string, otp: string): Promise<{
        phoneNumber: string;
        email: string;
        otp: string;
        validTill: string;
        isVerified: boolean;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & Otp>;
    getOtpForVerification(phoneNumber: string, email: string): Promise<Otp>;
    getUserById(userBasicId: string): Promise<UserBasic>;
    updateUserBasic(user: UserBasic): Promise<{
        relationship: import("../../shared/enums/user-profile.enum").Relationship;
        email: string;
        gender: import("../../shared/enums/user-profile.enum").Gender;
        countryCode: string;
        phoneNumber: string;
        password: string;
        displayId: string;
        activationStatus: import("src/shared/enums/miscellaneous.enum").ActivationStatus;
        lifecycleStatus: import("src/shared/enums/miscellaneous.enum").LifecycleStatus;
        fireBaseToken: string;
        registrationStep: RegistrationSteps;
        userBios: UserBio[];
        userAbouts: UserAbout[];
        userHabits: UserHabit[];
        userLifestyle: UserLifestyle[];
        userHobbies: UserHobbies[];
        userReligions: UserReligion[];
        visitedById: import("./entities/user.profile.visit").ProfileVisit[];
        visitedToId: import("./entities/user.profile.visit").ProfileVisit[];
        userCareers: UserCareer[];
        userFamilyBackgrounds: UserFamilyBackground[];
        userFamilyDetails: UserFamilyDetail[];
        userImages: UserImage[];
        userDocs: UserDocs[];
        userConnects: import("../connect/entities/user-connect.entity").UserConnect[];
        connectTransaction: import("../connect/entities/connect-transaction-entity").ConnectTransactionEntity[];
        rechargeHistory: import("../connect/entities/recharge-history.entity").RechargeHistory[];
        userConnectLogs: import("../connect/entities/recharge-history.entity").RechargeHistory[];
        userPreferences: UserPreference[];
        userLogins: UserLogin[];
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserBasic>;
    updateTokenToUserBasic(fireBaseToken: string, id: string): Promise<void>;
    updateUserAboutStatus(userAbout: UserAbout, profileUpdationStatus: ProfileUpdationStatus): Promise<UserAbout>;
    updateUserHabitStatus(userHabit: UserHabit, profileUpdationStatus: ProfileUpdationStatus): Promise<UserHabit>;
    updateUserReligionStatus(userReligion: UserReligion, profileUpdationStatus: ProfileUpdationStatus): Promise<UserReligion>;
    updateUserCareerStatus(userCareer: UserCareer, profileUpdationStatus: ProfileUpdationStatus): Promise<UserCareer>;
    updateUserFamilyBackgroundStatus(userFamilyBackground: UserFamilyBackground, profileUpdationStatus: ProfileUpdationStatus): Promise<UserFamilyBackground>;
    updateUserFamilyDetailStatus(ufd: UserFamilyDetail, profileUpdationStatus: ProfileUpdationStatus): Promise<UserFamilyDetail>;
    updateUserBioStatus(userBio: UserBio, profileUpdationStatus: ProfileUpdationStatus): Promise<UserBio>;
    updateUserImageStatus(userImages: UserImage[], profileUpdationStatus: ProfileUpdationStatus): Promise<UserDocs[]>;
    getUserGenderById(userBasicId: string): Promise<any>;
    getUserGenderAndPreference(userBasicId: string): Promise<any>;
    getProfilesByPreference(queryString: string): Promise<any>;
    getAdminUsers(): Promise<AdminUser[]>;
    getAdminUserByEmail(email: string): Promise<AdminUser>;
    createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<AdminUser>;
    updateAdminUser(adminUser: AdminUser): Promise<any>;
    createUserPreference(userBasic: UserBasic, cupd: CreateUserPreferenceDto): Promise<UserPreference>;
    getUserPartnerPreferences(userBasicId: string): Promise<UserPreference>;
    getAllUserDetailsById(userBasicId: string): Promise<UserBasic>;
    getRequiredLoginDetails(userBasicId: string): Promise<any>;
    getAppUsersForAdmin(quesryString: string): Promise<any>;
    visitedProfile(visitedBy: string, visitedTo: string): Promise<import("./entities/user.profile.visit").ProfileVisit>;
    getMatchPercentage(userBasicId: String, otherUserBasicId: String): Promise<{
        matchingFields: any[];
        differentFields: any[];
        match_percentage: string;
        requiredMatchDetails: any[];
        userImage: UserImage;
    }>;
    recentProfileViews(userBasicId: string): Promise<any>;
    getProifleVisitedBy(userBasicId: string): Promise<any>;
    getOnlineMembers(userBasicId: string, onlineUserIds: string[]): Promise<any>;
    getPremiumMembers(userBaicId: string): Promise<any>;
    blockProfile(ucl: any): Promise<any>;
    unBlockUser(id: string): Promise<import("typeorm").DeleteResult | "No record found">;
    getBlockedUsers(id: string): Promise<import("./entities/block-user.entity").UserBlock[]>;
    getBlockedUsersForAll(id: string): Promise<import("./entities/block-user.entity").UserBlock[]>;
    getBlockedUsersWhom(id: string): Promise<import("./entities/block-user.entity").UserBlock[]>;
    checkIfBlocked(myBasicId: string, userBasicId: string): Promise<import("./entities/block-user.entity").UserBlock>;
    sendNotification(): Promise<void>;
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
