import { CreateUserReligionDto } from './dtos/craete-user-religion.dto';
import { CreateAdminUserDto } from './dtos/create-admin-user.dto';
import { CreateUserAboutDto } from './dtos/create-user-about.dto';
import { CreateUserBasicDto } from './dtos/create-user-basic.dto';
import { CreateUserBioImageDto, UpdateUserDocsDto } from './dtos/create-user-bio-image.dto';
import { CreateUserCareerDto } from './dtos/create-user-career.dto';
import { CreateUserFamilyBgDto } from './dtos/create-user-familybg.dto';
import { CreateUserFamilyDDto } from './dtos/create-user-familyd.dto';
import { CreateUserHabitDto } from './dtos/create-user-habit.dto';
import { CreateUserHobbiesDto } from './dtos/create-user-hobbies.dto';
import { CreateUserLifestyleDto } from './dtos/create-user-lifestyle.dto';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
import { AdminUser } from './entities/admin-user.entity';
import { UserFacade } from './user.facade';
export declare class UserController {
    private readonly userFacade;
    constructor(userFacade: UserFacade);
    getAllUsers(skip: string, take: string, isVerified: string): Promise<{
        data: import("./entities/user-basic.entity").UserBasic[];
        message: string;
    }>;
    createUserBasic(createUserBasicDto: CreateUserBasicDto, fireBaseToken: any): Promise<{
        data: import("./entities/user-basic.entity").UserBasic;
        message: string;
    }>;
    getUserDeatailById(userBasicId: string, myBasicId: string): Promise<{
        data: {
            blockStatus: {};
            blockDetails: {
                isBlocked: boolean;
                id: string;
            };
            relationship: import("../../shared/enums/user-profile.enum").Relationship;
            email: string;
            gender: import("../../shared/enums/user-profile.enum").Gender;
            countryCode: string;
            phoneNumber: string;
            password: string;
            displayId: string;
            activationStatus: import("../../shared/enums/miscellaneous.enum").ActivationStatus;
            lifecycleStatus: import("../../shared/enums/miscellaneous.enum").LifecycleStatus;
            fireBaseToken: string;
            registrationStep: import("../../shared/enums/miscellaneous.enum").RegistrationSteps;
            userBios: import("./entities/user-bio.entity").UserBio[];
            userAbouts: import("./entities/user-about.entity").UserAbout[];
            userHabits: import("./entities/user-habit.entity").UserHabit[];
            userLifestyle: import("./entities/user-lifestyle.entity").UserLifestyle[];
            userHobbies: import("./entities/user-hobbies.entity").UserHobbies[];
            userReligions: import("./entities/user-religion.entity").UserReligion[];
            visitedBy: import("./entities/user.profile.visit").ProfileVisit[];
            visitedTo: import("./entities/user.profile.visit").ProfileVisit[];
            userCareers: import("./entities/user-career.entity").UserCareer[];
            userFamilyBackgrounds: import("./entities/user-family-background.entity").UserFamilyBackground[];
            userFamilyDetails: import("./entities/user-family-detail.entity").UserFamilyDetail[];
            userImages: import("./entities/user-image.entity").UserImage[];
            userDocs: import("./entities/user-docs.entity").UserDocs[];
            userConnects: import("../connect/entities/user-connect.entity").UserConnect[];
            connectTransaction: import("../connect/entities/connect-transaction-entity").ConnectTransactionEntity[];
            rechargeHistory: import("../connect/entities/recharge-history.entity").RechargeHistory[];
            userConnectLogs: import("../connect/entities/recharge-history.entity").RechargeHistory[];
            userPreferences: import("./entities/user-preference.entity").UserPreference[];
            userLogins: import("./entities/user-login.entity").UserLogin[];
            id: string;
            createdAt: string;
            createdBy: string;
            updatedAt: string;
            updatedBy: string;
            isActive: boolean;
        };
        message: string;
    }>;
    getUserDeatailByDisplayId(displayId: string, myBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    createUserAbout(createUserAboutDto: CreateUserAboutDto): Promise<{
        data: any;
        message: string;
    }>;
    createUserHabit(createUserHabitDto: CreateUserHabitDto): Promise<{
        data: any;
        message: string;
    }>;
    createUserLifeStyle(createUserLifestyleDto: CreateUserLifestyleDto): Promise<{
        data: any;
        message: string;
    }>;
    createUserHobbies(createUserHobbiesDto: CreateUserHobbiesDto): Promise<{
        data: any;
        message: string;
    }>;
    createUserReligion(createUserReligionDto: CreateUserReligionDto): Promise<{
        data: any;
        message: string;
    }>;
    createUserCareer(createUserCareerDto: CreateUserCareerDto): Promise<{
        data: any;
        message: string;
    }>;
    createUserPreference(createUserPreferenceDto: CreateUserPreferenceDto): Promise<{
        data: import("./entities/user-preference.entity").UserPreference;
        message: string;
    }>;
    getUserPartnerPreferences(userBasicId: string): Promise<{
        data: import("./entities/user-preference.entity").UserPreference;
        message: string;
    }>;
    createUserFamilyBackground(createUserFamilyBgDto: CreateUserFamilyBgDto): Promise<{
        data: any;
        message: string;
    }>;
    createUserFamilyDetail(createUserFamilyDDto: CreateUserFamilyDDto): Promise<{
        data: any;
        message: string;
    }>;
    uploadUserImages(userId: string, files: any, idProof: string): Promise<{
        data: any[];
        message: string;
    }>;
    uploadDocImages(userId: string, files: any): Promise<{
        data: any[];
        message: string;
    }>;
    createUserBioWithImages(createUserBioImageDto: CreateUserBioImageDto): Promise<{
        data: any;
        message: string;
    }>;
    updateUserBioWithDocs(updateUserDocsDto: UpdateUserDocsDto): Promise<{
        data: any;
        message: string;
    }>;
    verifyUserByAdmin(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    rejectUserByAdmin(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    getProfilesByPreference(userBasicId: string, age: string, height: string, maritalStatus: string, abilityStatus: string, religion: string, cast: string, gothra: string, motherTongue: string, isManglik: string, employedIn: string, occupation: string, highestEducation: string, annualIncome: string, food: string, smoke: string, drink: string, interests: string): Promise<{
        data: any[];
        message: string;
    }>;
    getPresignedUrl(userBasicId: string, fileKey: string, contentType: string): Promise<{
        data: string;
        message: string;
    }>;
    createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<{
        data: AdminUser;
        message: string;
    }>;
    updateAdminUser(createAdminUserDto: AdminUser): Promise<{
        data: any;
        message: string;
    }>;
    getAdminUsers(): Promise<{
        data: AdminUser[];
        message: string;
    }>;
    validateEmail(email: string): Promise<{
        data: {
            isEmailAvailable: boolean;
        };
        message: string;
    }>;
    getMatchPercentage(otherUserBasicId: string, userBasicId: string): Promise<{
        data: {
            matchingFields: any[];
            differentFields: any[];
            match_percentage: string;
            requiredMatchDetails: any[];
            userImage: import("./entities/user-image.entity").UserImage;
        };
        message: string;
    }>;
    getUserFromDisplayId(diplayId: string, userBasicId: string): Promise<{
        data: any[];
        message: string;
    }>;
    getAppUsersForAdmin(displayId: string, gender: number, cast: string, religion: string, relationship: number, location: string, startDate: string, endDate: string, isVerified: string, motherTongue: string, state: string, country: string, limit: string, offset: string, profileStatus: string): Promise<{
        data: {
            users: any[];
            count: number;
            lastSearchedIds: any[];
        };
        message: string;
    }>;
    getFilteredUsers(userFilterDto: UserFilterDto): Promise<{
        data: any[];
        message: string;
    }>;
    updateRegistrationStep(userBasicId: string, step: number): Promise<{
        data: {
            relationship: import("../../shared/enums/user-profile.enum").Relationship;
            email: string;
            gender: import("../../shared/enums/user-profile.enum").Gender;
            countryCode: string;
            phoneNumber: string;
            password: string;
            displayId: string;
            activationStatus: import("../../shared/enums/miscellaneous.enum").ActivationStatus;
            lifecycleStatus: import("../../shared/enums/miscellaneous.enum").LifecycleStatus;
            fireBaseToken: string;
            registrationStep: import("../../shared/enums/miscellaneous.enum").RegistrationSteps;
            userBios: import("./entities/user-bio.entity").UserBio[];
            userAbouts: import("./entities/user-about.entity").UserAbout[];
            userHabits: import("./entities/user-habit.entity").UserHabit[];
            userLifestyle: import("./entities/user-lifestyle.entity").UserLifestyle[];
            userHobbies: import("./entities/user-hobbies.entity").UserHobbies[];
            userReligions: import("./entities/user-religion.entity").UserReligion[];
            visitedBy: import("./entities/user.profile.visit").ProfileVisit[];
            visitedTo: import("./entities/user.profile.visit").ProfileVisit[];
            userCareers: import("./entities/user-career.entity").UserCareer[];
            userFamilyBackgrounds: import("./entities/user-family-background.entity").UserFamilyBackground[];
            userFamilyDetails: import("./entities/user-family-detail.entity").UserFamilyDetail[];
            userImages: import("./entities/user-image.entity").UserImage[];
            userDocs: import("./entities/user-docs.entity").UserDocs[];
            userConnects: import("../connect/entities/user-connect.entity").UserConnect[];
            connectTransaction: import("../connect/entities/connect-transaction-entity").ConnectTransactionEntity[];
            rechargeHistory: import("../connect/entities/recharge-history.entity").RechargeHistory[];
            userConnectLogs: import("../connect/entities/recharge-history.entity").RechargeHistory[];
            userPreferences: import("./entities/user-preference.entity").UserPreference[];
            userLogins: import("./entities/user-login.entity").UserLogin[];
            id: string;
            createdAt: string;
            createdBy: string;
            updatedAt: string;
            updatedBy: string;
            isActive: boolean;
        } & import("./entities/user-basic.entity").UserBasic;
        message: string;
    }>;
    visitedProfile(visitedBy: string, visitedTo: string): Promise<{
        data: import("./entities/user.profile.visit").ProfileVisit;
        message: string;
    }>;
    recentProfileViews(userBasicId: string): Promise<{
        data: any[];
        message: string;
    }>;
    getProifleVisitedBy(userBasicId: string): Promise<{
        data: any[];
        message: string;
    }>;
    getOnlineMembers(userBasicId: string, onlineUserIds: string[]): Promise<{
        data: any;
        message: string;
    }>;
    getPremiumMembers(userBasicId: string): Promise<{
        data: any[];
        message: string;
    }>;
    BlockUser(block_who: string, block_whom: string): Promise<{
        data: any;
        message: string;
    }>;
    unBlockUser(id: string): Promise<{
        data: string | import("typeorm").DeleteResult;
        message: string;
    }>;
    getBlockedUsers(basicId: string): Promise<{
        data: import("./entities/block-user.entity").UserBlock[];
        message: string;
    }>;
}
