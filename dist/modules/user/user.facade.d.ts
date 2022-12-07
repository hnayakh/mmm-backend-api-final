import { S3Service } from 'src/shared/services/s3.service';
import { MasterService } from '../master/master.service';
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
import { UserBasic } from './entities/user-basic.entity';
import { UserService } from './user.service';
import { UserFilterDto } from './dtos/user-filter.dto';
import { ConnectService } from '../connect/connect.service';
import { AdminUser } from './entities/admin-user.entity';
export declare class UserFacade {
    private readonly userService;
    private readonly masterService;
    private readonly s3Service;
    private readonly connectService;
    constructor(userService: UserService, masterService: MasterService, s3Service: S3Service, connectService: ConnectService);
    getAllUsers(skip: string, take: string, isVerified: string): Promise<UserBasic[]>;
    updateUserRegistrationStep(userBasicId: any, step: any): Promise<void>;
    createUserBasic(createUserBasicDto: CreateUserBasicDto): Promise<UserBasic>;
    createUserAbout(createUserAboutDto: CreateUserAboutDto): Promise<any>;
    createUserHabit(createUserHabitDto: CreateUserHabitDto): Promise<any>;
    createUserReligion(createUserReligionDto: CreateUserReligionDto): Promise<any>;
    createUserCareer(createUserCareerDto: CreateUserCareerDto): Promise<any>;
    createUserFamilyBackground(createUserFamilyBgDto: CreateUserFamilyBgDto): Promise<any>;
    createUserFamilyDetail(createUserFamilyDDto: CreateUserFamilyDDto): Promise<any>;
    uploadUserImages(userId: string, files: any): Promise<any[]>;
    uploadUserDocImages(userId: string, files: any): Promise<any[]>;
    createUserBioWithImages(createUserBioImageDto: CreateUserBioImageDto): Promise<import("./entities/user-bio.entity").UserBio>;
    updateUserBioWithDocs(updateUserDocsDto: UpdateUserDocsDto): Promise<import("./entities/user-bio.entity").UserBio>;
    rejectUserByAdmin(userBasicId: string): Promise<void>;
    verifyUserByAdmin(userBasicId: string): Promise<void>;
    private updateChildStatusesAfterAdminVerification;
    getUserFromDisplayId(userBasicId: string, displayId: string): Promise<any[]>;
    getProfilesByPreference(userBasicId: string, queryObj: any): Promise<any[]>;
    getFilteredUsers(userFilterDto: UserFilterDto): Promise<any[]>;
    getPresignedUrl(userBasicId: string, fileKey: string, contentType: string): Promise<string>;
    getAdminUsers(): Promise<AdminUser[]>;
    createAdminUser(createAdminUserDto: CreateAdminUserDto): Promise<AdminUser>;
    updateAdminUser(createAdminUserDto: AdminUser): Promise<any>;
    createUserPreference(createUserPreferenceDto: CreateUserPreferenceDto): Promise<import("./entities/user-preference.entity").UserPreference>;
    getUserDeatailById(userBasicId: string): Promise<UserBasic>;
    getUserDeatailByDisplayId(displayId: string): Promise<UserBasic>;
    getAppUsersForAdmin(filterObj: any): Promise<{
        users: any[];
        count: number;
        lastSearchedIds: any[];
    }>;
    private updateSearchedResults;
    validateEmail(email: string): Promise<{
        isEmailAvailable: boolean;
    }>;
    getMatchPercentage(userBasicId: any, otherUserBasicId: string): Promise<{
        matchingFields: any[];
        differentFields: any[];
        match_percentage: string;
        userImage: import("./entities/user-image.entity").UserImage;
    }>;
    visistedProfile(visitedBy: string, visitedTo: string): Promise<import("./entities/user.profile.visit").ProfileVisit>;
    recentProfileViews(userBasicId: string): Promise<any>;
    getProifleVisitedBy(userBasicId: string): Promise<any>;
    getOnlineMembers(userBasicId: string): Promise<any>;
    getPremiumMembers(userBasicId: string): Promise<any>;
}
