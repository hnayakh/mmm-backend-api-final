import { CreateUserReligionDto } from './dtos/craete-user-religion.dto';
import { CreateAdminUserDto } from './dtos/create-admin-user.dto';
import { CreateUserAboutDto } from './dtos/create-user-about.dto';
import { CreateUserBasicDto } from './dtos/create-user-basic.dto';
import { CreateUserBioImageDto } from './dtos/create-user-bio-image.dto';
import { CreateUserCareerDto } from './dtos/create-user-career.dto';
import { CreateUserFamilyBgDto } from './dtos/create-user-familybg.dto';
import { CreateUserFamilyDDto } from './dtos/create-user-familyd.dto';
import { CreateUserHabitDto } from './dtos/create-user-habit.dto';
import { CreateUserPreferenceDto } from './dtos/create-user-preference.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
import { UserFacade } from './user.facade';
export declare class UserController {
    private readonly userFacade;
    constructor(userFacade: UserFacade);
    getAllUsers(skip: string, take: string, isVerified: string): Promise<{
        data: import("./entities/user-basic.entity").UserBasic[];
        message: string;
    }>;
    createUserBasic(createUserBasicDto: CreateUserBasicDto): Promise<{
        data: import("./entities/user-basic.entity").UserBasic;
        message: string;
    }>;
    getUserDeatailById(userBasicId: string): Promise<{
        data: import("./entities/user-basic.entity").UserBasic;
        message: string;
    }>;
    createUserAbout(createUserAboutDto: CreateUserAboutDto): Promise<{
        data: import("./entities/user-about.entity").UserAbout;
        message: string;
    }>;
    createUserHabit(createUserHabitDto: CreateUserHabitDto): Promise<{
        data: import("./entities/user-habit.entity").UserHabit;
        message: string;
    }>;
    createUserReligion(createUserReligionDto: CreateUserReligionDto): Promise<{
        data: import("./entities/user-religion.entity").UserReligion;
        message: string;
    }>;
    createUserCareer(createUserCareerDto: CreateUserCareerDto): Promise<{
        data: import("./entities/user-career.entity").UserCareer;
        message: string;
    }>;
    createUserPreference(createUserPreferenceDto: CreateUserPreferenceDto): Promise<{
        data: import("./entities/user-preference.entity").UserPreference;
        message: string;
    }>;
    createUserFamilyBackground(createUserFamilyBgDto: CreateUserFamilyBgDto): Promise<{
        data: import("./entities/user-family-background.entity").UserFamilyBackground;
        message: string;
    }>;
    createUserFamilyDetail(createUserFamilyDDto: CreateUserFamilyDDto): Promise<{
        data: import("./entities/user-family-detail.entity").UserFamilyDetail;
        message: string;
    }>;
    uploadUserImages(userId: string, files: any): Promise<{
        data: any[];
        message: string;
    }>;
    createUserBioWithImages(createUserBioImageDto: CreateUserBioImageDto): Promise<{
        data: import("./entities/user-bio.entity").UserBio;
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
        data: import("./entities/admin-user.entity").AdminUser;
        message: string;
    }>;
    getAdminUsers(): Promise<{
        data: import("./entities/admin-user.entity").AdminUser[];
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
        };
        message: string;
    }>;
    getUserFromDisplayId(diplayId: string, userBasicId: string): Promise<{
        data: any[];
        message: string;
    }>;
    getAppUsersForAdmin(displayId: string, gender: number, cast: string, religion: string, relationship: number, location: string, startDate: string, endDate: string, isVerified: string, motherTongue: string, state: string, country: string, limit: string, offset: string): Promise<{
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
    visitedProfile(visitedBy: string, visitedTo: string): Promise<{
        data: import("./entities/user.profile.visit").ProfileVisit;
        message: string;
    }>;
    recentProfileViews(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    getProifleVisitedBy(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    getPremiumMembers(userBasicId: string): Promise<{
        data: void;
        message: string;
    }>;
}
