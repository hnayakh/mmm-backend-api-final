import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
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
    private readonly userBioRepo;
    private readonly otpRepo;
    private readonly userLoginRepo;
    private readonly adminUserRepo;
    private readonly userPreferenceRepo;
    private readonly userProfileVisitRepo;
    constructor(jwtstategy: JwtService, userBasicRepo: Repository<UserBasic>, userAboutRepo: Repository<UserAbout>, userHabitRepo: Repository<UserHabit>, userReligionRepo: Repository<UserReligion>, userCareerRepo: Repository<UserCareer>, userFamilyBackgroundRepo: Repository<UserFamilyBackground>, userFamilyDetailRepo: Repository<UserFamilyDetail>, userImageRepo: Repository<UserImage>, userBioRepo: Repository<UserBio>, otpRepo: Repository<Otp>, userLoginRepo: Repository<UserLogin>, adminUserRepo: Repository<AdminUser>, userPreferenceRepo: Repository<UserPreference>, userProfileVisitRepo: Repository<ProfileVisit>);
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
        registrationStep: import("src/shared/enums/miscellaneous.enum").RegistrationSteps;
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
        userDocs: import("./entities/user-docs.entity").UserDocs[];
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
    getUserBasicById(userBasicId: string): Promise<UserBasic>;
    createUserAbout(userAbout: UserAbout): Promise<UserAbout>;
    updateUserAbout(userAbout: UserAbout): Promise<{
        name: string;
        dateOfBirth: string;
        maritalStatus: import("../../shared/enums/user-profile.enum").MaritalStatus;
        childrenStatus: import("../../shared/enums/user-profile.enum").ChildrenStatus;
        numberOfChildren: import("../../shared/enums/user-profile.enum").NumberOfChildren;
        abilityStatus: import("../../shared/enums/user-profile.enum").AbilityStatus;
        profileUpdationStatus: ProfileUpdationStatus;
        height: number;
        userBasic: UserBasic;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserAbout>;
    createUserHabit(userHabit: UserHabit): Promise<UserHabit>;
    updateUserHabit(userHabit: UserHabit): Promise<{
        eatingHabit: import("../../shared/enums/user-profile.enum").EatingHabit;
        smokingHabit: import("../../shared/enums/user-profile.enum").SmokingHabit;
        drinkingHabit: import("../../shared/enums/user-profile.enum").DrinkingHabit;
        profileUpdationStatus: ProfileUpdationStatus;
        userBasic: UserBasic;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserHabit>;
    createUserFamilyDetail(ufd: UserFamilyDetail): Promise<UserFamilyDetail>;
    updateUserFamilyDetail(ufd: UserFamilyDetail): Promise<{
        fatherOccupation: import("../../shared/enums/user-profile.enum").FatherOccupation;
        motherOccupation: import("../../shared/enums/user-profile.enum").MotherOccupation;
        numberOfBrothers: number;
        marriedNumberOfBrothers: number;
        numberOfSisters: number;
        marriedNumberOfSisters: number;
        profileUpdationStatus: ProfileUpdationStatus;
        userBasic: UserBasic;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserFamilyDetail>;
    createUserFamilyBackground(ufbg: UserFamilyBackground): Promise<UserFamilyBackground>;
    updateUserFamilyBackground(ufbg: UserFamilyBackground): Promise<{
        familyStatus: import("../../shared/enums/user-profile.enum").FamilyAfluenceLevel;
        familyValues: import("../../shared/enums/user-profile.enum").FamilyValues;
        familyType: import("../../shared/enums/user-profile.enum").FamilyType;
        country: number;
        state: number;
        city: number;
        profileUpdationStatus: ProfileUpdationStatus;
        userBasic: UserBasic;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserFamilyBackground>;
    createUserCareer(userCareer: UserCareer): Promise<UserCareer>;
    updateUserCareer(userCareer: UserCareer): Promise<{
        employedIn: string;
        occupation: string;
        annualIncome: import("../../shared/enums/user-profile.enum").AnualIncome;
        highestEducation: string;
        country: number;
        state: number;
        city: number;
        profileUpdationStatus: ProfileUpdationStatus;
        userBasic: UserBasic;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserCareer>;
    createUserReligion(userReligion: UserReligion): Promise<UserReligion>;
    updateUserReligion(userReligion: UserReligion): Promise<{
        religion: string;
        cast: string;
        gothra: string;
        motherTongue: string;
        isManglik: import("../../shared/enums/user-profile.enum").Manglik;
        profileUpdationStatus: ProfileUpdationStatus;
        userBasic: UserBasic;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserReligion>;
    createUserBio(userBio: UserBio): Promise<UserBio>;
    updateUserBio(userBio: UserBio): Promise<{
        aboutMe: string;
        profileUpdationStatus: ProfileUpdationStatus;
        userBasic: UserBasic;
        id: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
        isActive: boolean;
    } & UserBio>;
    createUserImages(userImages: UserImage[]): Promise<UserImage[]>;
    updateUserImages(userImages: UserImage[]): Promise<UserImage[]>;
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
}
