import { RegistrationSteps } from 'src/shared/enums/miscellaneous.enum';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from './entities/admin-user.entity';
import { Otp } from './entities/otp.entity';
import { UserAbout } from './entities/user-about.entity';
import { UserBasic } from './entities/user-basic.entity';
import { UserBio } from './entities/user-bio.entity';
import { UserCareer } from './entities/user-career.entity';
import { UserFamilyBackground } from './entities/user-family-background.entity';
import { UserFamilyDetail } from './entities/user-family-detail.entity';
import { UserHabit } from './entities/user-habit.entity';
import { UserImage } from './entities/user-image.entity';
import { UserLogin } from './entities/user-login.entity';
import { UserPreference } from './entities/user-preference.entity';
import { UserReligion } from './entities/user-religion.entity';
import { ProfileVisit } from './entities/user.profile.visit';
import { UserDocs } from './entities/user-docs.entity';
import { Notification } from './entities/notification.entity';
export declare class UserRepo {
    private readonly jwtstategy;
    private readonly userBasicRepo;
    private readonly userAboutRepo;
    private readonly userHabitRepo;
    private readonly userReligionRepo;
    private readonly userCareerRepo;
    private readonly userFamilyBackgroundRepo;
    private readonly userFamilyDetailRepo;
    private readonly userImageRepo;
    private readonly userDocRepo;
    private readonly userBioRepo;
    private readonly otpRepo;
    private readonly userLoginRepo;
    private readonly adminUserRepo;
    private readonly userPreferenceRepo;
    private readonly userProfileVisitRepo;
    private readonly notificationRepo;
    constructor(jwtstategy: JwtService, userBasicRepo: Repository<UserBasic>, userAboutRepo: Repository<UserAbout>, userHabitRepo: Repository<UserHabit>, userReligionRepo: Repository<UserReligion>, userCareerRepo: Repository<UserCareer>, userFamilyBackgroundRepo: Repository<UserFamilyBackground>, userFamilyDetailRepo: Repository<UserFamilyDetail>, userImageRepo: Repository<UserImage>, userDocRepo: Repository<UserDocs>, userBioRepo: Repository<UserBio>, otpRepo: Repository<Otp>, userLoginRepo: Repository<UserLogin>, adminUserRepo: Repository<AdminUser>, userPreferenceRepo: Repository<UserPreference>, userProfileVisitRepo: Repository<ProfileVisit>, notificationRepo: Repository<Notification>);
    getAllUsers(skip: string, take: string): Promise<UserBasic[]>;
    getUsersByIds(userBasicIds: string[]): Promise<any>;
    createUserBasic(userBasic: UserBasic): Promise<UserBasic>;
    updateUserBasic(userBasic: UserBasic): Promise<{
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
        userReligions: UserReligion[];
        visitedBy: ProfileVisit[];
        visitedTo: ProfileVisit[];
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
    updateToken(fireBaseToken: any, id: any): Promise<any>;
    getUserBasicById(userBasicId: string): Promise<UserBasic>;
    getUserAboutyId(userBasicId: string): Promise<UserAbout>;
    createUserAbout(userAbout: UserAbout): Promise<any>;
    updateUserAbout(userAbout: UserAbout): Promise<UserAbout>;
    createUserHabit(userHabit: UserHabit): Promise<any>;
    updateUserHabit(userHabit: UserHabit): Promise<UserHabit>;
    createUserFamilyDetail(ufd: UserFamilyDetail): Promise<any>;
    updateUserFamilyDetail(ufd: UserFamilyDetail): Promise<UserFamilyDetail>;
    createUserFamilyBackground(ufbg: UserFamilyBackground): Promise<any>;
    updateUserFamilyBackground(ufbg: UserFamilyBackground): Promise<UserFamilyBackground>;
    createUserCareer(userCareer: UserCareer): Promise<any>;
    updateUserCareer(userCareer: UserCareer): Promise<UserCareer>;
    createUserReligion(userReligion: UserReligion): Promise<any>;
    updateUserReligion(userReligion: UserReligion): Promise<UserReligion>;
    createUserBio(userBio: UserBio): Promise<any>;
    updateUserBio(userBio: UserBio): Promise<UserBio>;
    createUserImages(userImages: UserImage[]): Promise<UserImage[]>;
    createUserDocs(userImages: UserDocs[]): Promise<(UserDocs & UserImage)[]>;
    updateUserImages(userDocRepo: UserDocs[]): Promise<UserDocs[]>;
    getUserBasicByEmail(email: string): Promise<UserBasic>;
    getUserById(userBasicId: string): Promise<UserBasic>;
    getUserBasicByPhone(phoneNumber: string): Promise<UserBasic>;
    createUserLoginRecord(userLogin: UserLogin): Promise<UserLogin>;
    createOtp(otpObj: Otp): Promise<Otp>;
    updateOtpStatus(otpObj: Otp): Promise<{
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
    getUserGenderById(userBasicId: string): Promise<any>;
    getUserGenderAndPreference(userBasicId: string): Promise<any>;
    getAppUsersForAdmin(queryString: string): Promise<any>;
    getProfilesByPreference(queryString: string): Promise<any>;
    createAdminUser(adminUser: AdminUser): Promise<AdminUser>;
    updateAdminUser(adminUser: AdminUser): Promise<any>;
    getAdminUsers(): Promise<AdminUser[]>;
    getAdminUserByEmail(email: string): Promise<AdminUser>;
    createUserPreference(userPreference: UserPreference): Promise<UserPreference>;
    visitedProfile(visitedBy: UserBasic, visitedTo: UserBasic): Promise<ProfileVisit>;
    getAllUserDetailsById(userBasicId: string): Promise<UserBasic>;
    getRequiredLoginDetails(userBasicId: string): Promise<any>;
    getUserPreferenceByUserId(userBasicId: string): Promise<UserPreference>;
    getMatchPercentage(userBasicId: any, otherUserBasicId: any): Promise<{
        matchingFields: any[];
        differentFields: any[];
        match_percentage: string;
        userImage: UserImage;
    }>;
    getRecentViews(userBasicId: string): Promise<any>;
    getProifleVisitedBy(userBasicId: string): Promise<any>;
    getOnlineMembers(userBasicId: string): Promise<any>;
    getPremiumMembers(userBasicId: string): Promise<any>;
    createNotification(data: any): Promise<any>;
    updateNotification(data: any): Promise<any>;
}
