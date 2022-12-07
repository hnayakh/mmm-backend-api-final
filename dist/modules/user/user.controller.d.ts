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
    createUserBasic(createUserBasicDto: CreateUserBasicDto): Promise<{
        data: import("./entities/user-basic.entity").UserBasic;
        message: string;
    }>;
    getUserDeatailById(userBasicId: string): Promise<{
        data: import("./entities/user-basic.entity").UserBasic;
        message: string;
    }>;
    getUserDeatailByDisplayId(displayId: string): Promise<{
        data: {};
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
        data: import("./entities/user-bio.entity").UserBio;
        message: string;
    }>;
    updateUserBioWithDocs(updateUserDocsDto: UpdateUserDocsDto): Promise<{
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
        data: {};
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
    getOnlineMembers(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
    getPremiumMembers(userBasicId: string): Promise<{
        data: any;
        message: string;
    }>;
}
