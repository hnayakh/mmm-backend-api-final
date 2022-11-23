import { ProfileUpdationStatus } from 'src/shared/enums/miscellaneous.enum';
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
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: UserRepo);
    getAllUsers(skip: string, take: string): Promise<UserBasic[]>;
    getUsersByIds(userBasicIds: string[]): Promise<any>;
    createUserBasic(createUserBasicDto: CreateUserBasicDto): Promise<UserBasic>;
    getUserBasicById(userBasicId: string): Promise<UserBasic>;
    createUserAbout(userBasic: UserBasic, createUserAboutDto: CreateUserAboutDto): Promise<UserAbout>;
    createUserHabit(userBasic: UserBasic, createUserHabitDto: CreateUserHabitDto): Promise<UserHabit>;
    createUserFamilyDetail(userBasic: UserBasic, createUserFamilyDDto: CreateUserFamilyDDto): Promise<UserFamilyDetail>;
    createUserFamilyBackground(userBasic: UserBasic, createUserFamilyBgDto: CreateUserFamilyBgDto): Promise<UserFamilyBackground>;
    createUserCareer(userBasic: UserBasic, createUserCareerDto: CreateUserCareerDto): Promise<UserCareer>;
    createUserReligion(userBasic: UserBasic, createUserReligionDto: CreateUserReligionDto): Promise<UserReligion>;
    createUserBioWithImages(userBasic: UserBasic, createUserBioImageDto: CreateUserBioImageDto): Promise<UserBio>;
    updateUserBioWithDocs(userBasic: UserBasic, createUserBioImageDto: UpdateUserDocsDto): Promise<UserDocs[]>;
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
    updateUserBasic(user: UserBasic): Promise<void>;
    updateUserAboutStatus(userAbout: UserAbout, profileUpdationStatus: ProfileUpdationStatus): Promise<UserAbout>;
    updateUserHabitStatus(userHabit: UserHabit, profileUpdationStatus: ProfileUpdationStatus): Promise<{
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
    updateUserReligionStatus(userReligion: UserReligion, profileUpdationStatus: ProfileUpdationStatus): Promise<{
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
    updateUserCareerStatus(userCareer: UserCareer, profileUpdationStatus: ProfileUpdationStatus): Promise<{
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
    updateUserFamilyBackgroundStatus(userFamilyBackground: UserFamilyBackground, profileUpdationStatus: ProfileUpdationStatus): Promise<UserFamilyBackground>;
    updateUserFamilyDetailStatus(ufd: UserFamilyDetail, profileUpdationStatus: ProfileUpdationStatus): Promise<UserFamilyDetail>;
    updateUserBioStatus(userBio: UserBio, profileUpdationStatus: ProfileUpdationStatus): Promise<{
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
    updateUserImageStatus(userImages: UserImage[], profileUpdationStatus: ProfileUpdationStatus): Promise<UserDocs[]>;
    getUserGenderById(userBasicId: string): Promise<any>;
    getUserGenderAndPreference(userBasicId: string): Promise<any>;
    getProfilesByPreference(queryString: string): Promise<any>;
    getAdminUsers(): Promise<AdminUser[]>;
    getAdminUserByEmail(email: string): Promise<AdminUser>;
    createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<AdminUser>;
    updateAdminUser(adminUser: AdminUser): Promise<any>;
    createUserPreference(userBasic: UserBasic, cupd: CreateUserPreferenceDto): Promise<UserPreference>;
    getAllUserDetailsById(userBasicId: string): Promise<UserBasic>;
    getRequiredLoginDetails(userBasicId: string): Promise<any>;
    getAppUsersForAdmin(quesryString: string): Promise<any>;
    visitedProfile(visitedBy: string, visitedTo: string): Promise<import("./entities/user.profile.visit").ProfileVisit>;
    getMatchPercentage(userBasicId: String, otherUserBasicId: String): Promise<{
        matchingFields: any[];
        differentFields: any[];
        match_percentage: string;
        userImage: UserImage;
    }>;
    recentProfileViews(userBasicId: string): Promise<any>;
    getProifleVisitedBy(userBasicId: string): Promise<any>;
    getOnlineMembers(userBasicId: string): Promise<any>;
    getPremiumMembers(userBaicId: string): Promise<any>;
}
