"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const response_service_1 = require("../../shared/services/response.service");
const craete_user_religion_dto_1 = require("./dtos/craete-user-religion.dto");
const create_admin_user_dto_1 = require("./dtos/create-admin-user.dto");
const create_user_about_dto_1 = require("./dtos/create-user-about.dto");
const create_user_basic_dto_1 = require("./dtos/create-user-basic.dto");
const create_user_bio_image_dto_1 = require("./dtos/create-user-bio-image.dto");
const create_user_career_dto_1 = require("./dtos/create-user-career.dto");
const create_user_familybg_dto_1 = require("./dtos/create-user-familybg.dto");
const create_user_familyd_dto_1 = require("./dtos/create-user-familyd.dto");
const create_user_habit_dto_1 = require("./dtos/create-user-habit.dto");
const create_user_preference_dto_1 = require("./dtos/create-user-preference.dto");
const user_filter_dto_1 = require("./dtos/user-filter.dto");
const user_facade_1 = require("./user.facade");
let UserController = class UserController {
    constructor(userFacade) {
        this.userFacade = userFacade;
    }
    async getAllUsers(skip, take, isVerified) {
        const users = await this.userFacade.getAllUsers(skip, take, isVerified);
        return { data: users, message: 'All users fetched successfully.' };
    }
    async createUserBasic(createUserBasicDto) {
        const userBasic = await this.userFacade.createUserBasic(createUserBasicDto);
        return { data: userBasic, message: 'User basic registration successful.' };
    }
    async getUserDeatailById(userBasicId) {
        const userBasic = await this.userFacade.getUserDeatailById(userBasicId);
        return {
            data: userBasic,
            message: 'User basic details fetched successful.',
        };
    }
    async getUserDeatailByDisplayId(displayId) {
        console.log("DISPLAY", displayId);
        let message = 'User basic details fetched successful.';
        const userBasic = await this.userFacade.getUserDeatailByDisplayId(displayId);
        if (!userBasic) {
            message = "No user found for given DisplayId";
        }
        return {
            data: userBasic ? userBasic : {},
            message: message,
        };
    }
    async createUserAbout(createUserAboutDto) {
        const userAbout = await this.userFacade.createUserAbout(createUserAboutDto);
        return { data: userAbout, message: 'User about registration successful.' };
    }
    async createUserHabit(createUserHabitDto) {
        const userHabit = await this.userFacade.createUserHabit(createUserHabitDto);
        return { data: userHabit, message: 'User habit registration successful.' };
    }
    async createUserReligion(createUserReligionDto) {
        const userReligion = await this.userFacade.createUserReligion(createUserReligionDto);
        return {
            data: userReligion,
            message: 'User habit registration successful.',
        };
    }
    async createUserCareer(createUserCareerDto) {
        const userCareer = await this.userFacade.createUserCareer(createUserCareerDto);
        return {
            data: userCareer,
            message: 'User career registration successful.',
        };
    }
    async createUserPreference(createUserPreferenceDto) {
        const userPreference = await this.userFacade.createUserPreference(createUserPreferenceDto);
        return {
            data: userPreference,
            message: 'User preference created successfully.',
        };
    }
    async createUserFamilyBackground(createUserFamilyBgDto) {
        const userFamilyBg = await this.userFacade.createUserFamilyBackground(createUserFamilyBgDto);
        return {
            data: userFamilyBg,
            message: 'User family background registration successful.',
        };
    }
    async createUserFamilyDetail(createUserFamilyDDto) {
        const userFamilyDetail = await this.userFacade.createUserFamilyDetail(createUserFamilyDDto);
        return {
            data: userFamilyDetail,
            message: 'User family detail registration successful.',
        };
    }
    async uploadUserImages(userId, files) {
        const imageUrls = await this.userFacade.uploadUserImages(userId, files);
        return { data: imageUrls, message: 'User image uploaded successfully.' };
    }
    async createUserBioWithImages(createUserBioImageDto) {
        const result = await this.userFacade.createUserBioWithImages(createUserBioImageDto);
        return { data: result, message: 'User profile registration successful.' };
    }
    async verifyUserByAdmin(userBasicId) {
        const result = await this.userFacade.verifyUserByAdmin(userBasicId);
        return { data: null, message: 'User profile verified successful.' };
    }
    async rejectUserByAdmin(userBasicId) {
        const result = await this.userFacade.rejectUserByAdmin(userBasicId);
        return { data: null, message: 'User profile rejected.' };
    }
    async getProfilesByPreference(userBasicId, age, height, maritalStatus, abilityStatus, religion, cast, gothra, motherTongue, isManglik, employedIn, occupation, highestEducation, annualIncome, food, smoke, drink, interests) {
        let queryObj = {
            age,
            height,
            maritalStatus,
            abilityStatus,
            religion,
            cast,
            gothra,
            motherTongue,
            isManglik,
            employedIn,
            occupation,
            highestEducation,
            annualIncome,
            food,
            smoke,
            drink,
            interests,
        };
        const result = await this.userFacade.getProfilesByPreference(userBasicId, queryObj);
        return { data: result, message: 'Preferred profiles fetched.' };
    }
    async getPresignedUrl(userBasicId, fileKey, contentType) {
        const result = await this.userFacade.getPresignedUrl(userBasicId, fileKey, contentType);
        return { data: result, message: 'Presigned url generated successfully.' };
    }
    async createAdminUser(createAdminUserDto) {
        const adminUser = await this.userFacade.createAdminUser(createAdminUserDto);
        return { data: adminUser, message: 'Admin registration successful.' };
    }
    async getAdminUsers() {
        const adminUsers = await this.userFacade.getAdminUsers();
        return { data: adminUsers, message: 'Admin registration successful.' };
    }
    async validateEmail(email) {
        const response = await this.userFacade.validateEmail(email);
        return {
            data: response,
            message: response.isEmailAvailable ? 'Proceed' : 'Email already exist.',
        };
    }
    async getMatchPercentage(otherUserBasicId, userBasicId) {
        const response = await this.userFacade.getMatchPercentage(userBasicId, otherUserBasicId);
        return { data: response, message: 'Respnse received successfully.' };
    }
    async getUserFromDisplayId(diplayId, userBasicId) {
        console.log('display id', diplayId);
        const response = await this.userFacade.getUserFromDisplayId(userBasicId, diplayId);
        return { data: response, message: 'Response received successfully.' };
    }
    async getAppUsersForAdmin(displayId, gender, cast, religion, relationship, location, startDate, endDate, isVerified, motherTongue, state, country, limit, offset) {
        let filterObj = {
            displayId,
            gender,
            cast,
            religion,
            relationship,
            location,
            startDate,
            endDate,
            isVerified,
            motherTongue,
            state,
            country,
            limit,
            offset,
        };
        console.log(filterObj);
        const users = await this.userFacade.getAppUsersForAdmin(filterObj);
        let res = new response_service_1.ResponseService();
        return { data: users, message: 'All the users fetched successfully.' };
    }
    async getFilteredUsers(userFilterDto) {
        const filteredUsers = await this.userFacade.getFilteredUsers(userFilterDto);
        return { data: filteredUsers, message: 'Users fetched successfully.' };
    }
    async updateRegistrationStep(userBasicId, step) {
        await this.userFacade.updateUserRegistrationStep(userBasicId, step);
        return { data: {}, message: 'Registration step updated successfully.' };
    }
    async visitedProfile(visitedBy, visitedTo) {
        const response = await this.userFacade.visistedProfile(visitedBy, visitedTo);
        return { data: response, message: 'Visited profile updated.' };
    }
    async recentProfileViews(userBasicId) {
        const response = await this.userFacade.recentProfileViews(userBasicId);
        return {
            data: response,
            message: 'Rencely Visited Profiles.',
        };
    }
    async getProifleVisitedBy(userBasicId) {
        const response = await this.userFacade.getProifleVisitedBy(userBasicId);
        return {
            data: response,
            message: 'Rencely Profile Visited By .',
        };
    }
    async getOnlineMembers(userBasicId) {
        const response = await this.userFacade.getOnlineMembers(userBasicId);
        return {
            data: response,
            message: 'Online Members .',
        };
    }
    async getPremiumMembers(userBasicId) {
        const response = await this.userFacade.getPremiumMembers(userBasicId);
        console.log("response", response);
        return {
            data: response,
            message: ' Premium members profiles fetched.',
        };
    }
};
__decorate([
    swagger_1.ApiQuery({ name: 'skip', required: false }),
    swagger_1.ApiQuery({ name: 'take', required: false }),
    swagger_1.ApiQuery({ name: 'isVerified', required: false }),
    common_1.Get(),
    __param(0, common_1.Query('skip')),
    __param(1, common_1.Query('take')),
    __param(2, common_1.Query('isVerified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    common_1.Post('basic'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_basic_dto_1.CreateUserBasicDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserBasic", null);
__decorate([
    common_1.Get('basic/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDeatailById", null);
__decorate([
    common_1.Get('displaybasic/:displayId'),
    __param(0, common_1.Param('displayId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDeatailByDisplayId", null);
__decorate([
    common_1.Post('about'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_about_dto_1.CreateUserAboutDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserAbout", null);
__decorate([
    common_1.Post('habit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_habit_dto_1.CreateUserHabitDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserHabit", null);
__decorate([
    common_1.Post('religion'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [craete_user_religion_dto_1.CreateUserReligionDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserReligion", null);
__decorate([
    common_1.Post('career'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_career_dto_1.CreateUserCareerDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserCareer", null);
__decorate([
    common_1.Post('preference'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_preference_dto_1.CreateUserPreferenceDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserPreference", null);
__decorate([
    common_1.Post('familyBackground'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_familybg_dto_1.CreateUserFamilyBgDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserFamilyBackground", null);
__decorate([
    common_1.Post('familyDetail'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_familyd_dto_1.CreateUserFamilyDDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserFamilyDetail", null);
__decorate([
    common_1.Post('images/:userId'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadUserImages", null);
__decorate([
    common_1.Post('bio'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_bio_image_dto_1.CreateUserBioImageDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserBioWithImages", null);
__decorate([
    common_1.Get('admin/verify/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyUserByAdmin", null);
__decorate([
    common_1.Get('admin/rejct/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "rejectUserByAdmin", null);
__decorate([
    swagger_1.ApiQuery({ name: 'age', required: false }),
    swagger_1.ApiQuery({ name: 'height', required: false }),
    swagger_1.ApiQuery({ name: 'maritalStatus', required: false }),
    swagger_1.ApiQuery({ name: 'abilityStatus', required: false }),
    swagger_1.ApiQuery({ name: 'religion', required: false }),
    swagger_1.ApiQuery({ name: 'cast', required: false }),
    swagger_1.ApiQuery({ name: 'gothra', required: false }),
    swagger_1.ApiQuery({ name: 'motherTongue', required: false }),
    swagger_1.ApiQuery({ name: 'isManglik', required: false }),
    swagger_1.ApiQuery({ name: 'employedIn', required: false }),
    swagger_1.ApiQuery({ name: 'occupation', required: false }),
    swagger_1.ApiQuery({ name: 'highestEducation', required: false }),
    swagger_1.ApiQuery({ name: 'annualIncome', required: false }),
    swagger_1.ApiQuery({ name: 'food', required: false }),
    swagger_1.ApiQuery({ name: 'smoke', required: false }),
    swagger_1.ApiQuery({ name: 'drink', required: false }),
    swagger_1.ApiQuery({ name: 'interests', required: false }),
    common_1.Get('profiles/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __param(1, common_1.Query('age')),
    __param(2, common_1.Query('height')),
    __param(3, common_1.Query('maritalStatus')),
    __param(4, common_1.Query('abilityStatus')),
    __param(5, common_1.Query('religion')),
    __param(6, common_1.Query('cast')),
    __param(7, common_1.Query('gothra')),
    __param(8, common_1.Query('motherTongue')),
    __param(9, common_1.Query('isManglik')),
    __param(10, common_1.Query('employedIn')),
    __param(11, common_1.Query('occupation')),
    __param(12, common_1.Query('highestEducation')),
    __param(13, common_1.Query('annualIncome')),
    __param(14, common_1.Query('food')),
    __param(15, common_1.Query('smoke')),
    __param(16, common_1.Query('drink')),
    __param(17, common_1.Query('interests')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfilesByPreference", null);
__decorate([
    swagger_1.ApiQuery({ name: 'fileKey', required: true }),
    swagger_1.ApiQuery({ name: 'contentType', required: true }),
    common_1.Get('presignedUrl/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __param(1, common_1.Query('fileKey')),
    __param(2, common_1.Query('contentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPresignedUrl", null);
__decorate([
    common_1.Post('admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_user_dto_1.CreateAdminUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAdminUser", null);
__decorate([
    common_1.Get('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAdminUsers", null);
__decorate([
    swagger_1.ApiQuery({ name: 'email', required: true }),
    common_1.Get('validate/email'),
    __param(0, common_1.Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateEmail", null);
__decorate([
    swagger_1.ApiQuery({ name: 'otherUserBasicId', required: true }),
    common_1.Get('match_percentage/:userBasicId'),
    __param(0, common_1.Query('otherUserBasicId')),
    __param(1, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMatchPercentage", null);
__decorate([
    swagger_1.ApiQuery({ name: 'diplayId', required: true }),
    common_1.Get('user_serach/:userBasicId'),
    __param(0, common_1.Query('diplayId')),
    __param(1, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserFromDisplayId", null);
__decorate([
    swagger_1.ApiQuery({ name: 'displayId', required: false }),
    swagger_1.ApiQuery({ name: 'gender', required: false }),
    swagger_1.ApiQuery({ name: 'cast', required: false }),
    swagger_1.ApiQuery({ name: 'religion', required: false }),
    swagger_1.ApiQuery({ name: 'relationship', required: false }),
    swagger_1.ApiQuery({ name: 'location', required: false }),
    swagger_1.ApiQuery({ name: 'startDate', required: false }),
    swagger_1.ApiQuery({ name: 'endDate', required: false }),
    swagger_1.ApiQuery({ name: 'isVerified', required: false }),
    swagger_1.ApiQuery({ name: 'motherTongue', required: false }),
    swagger_1.ApiQuery({ name: 'state', required: false }),
    swagger_1.ApiQuery({ name: 'country', required: false }),
    swagger_1.ApiQuery({ name: 'limit', required: false }),
    swagger_1.ApiQuery({ name: 'offset', required: false }),
    common_1.Get('admin/appUsers'),
    __param(0, common_1.Query('displayId')),
    __param(1, common_1.Query('gender')),
    __param(2, common_1.Query('cast')),
    __param(3, common_1.Query('religion')),
    __param(4, common_1.Query('relationship')),
    __param(5, common_1.Query('location')),
    __param(6, common_1.Query('startDate')),
    __param(7, common_1.Query('endDate')),
    __param(8, common_1.Query('isVerified')),
    __param(9, common_1.Query('motherTongue')),
    __param(10, common_1.Query('state')),
    __param(11, common_1.Query('country')),
    __param(12, common_1.Query('limit')),
    __param(13, common_1.Query('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, Number, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAppUsersForAdmin", null);
__decorate([
    common_1.Post('app/users/filter'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_filter_dto_1.UserFilterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFilteredUsers", null);
__decorate([
    common_1.Post('app/users/updateRegistrationStep/:userBasicId/:step'),
    __param(0, common_1.Param('userBasicId')),
    __param(1, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateRegistrationStep", null);
__decorate([
    swagger_1.ApiQuery({ name: 'visitedBy', required: true }),
    swagger_1.ApiQuery({ name: 'visitedTo', required: true }),
    common_1.Post('visit_profile'),
    __param(0, common_1.Query('visitedBy')),
    __param(1, common_1.Query('visitedTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "visitedProfile", null);
__decorate([
    common_1.Get('recent_view/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "recentProfileViews", null);
__decorate([
    common_1.Get('profile_visited_by/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProifleVisitedBy", null);
__decorate([
    common_1.Get('online_members/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOnlineMembers", null);
__decorate([
    common_1.Get('premium_members/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPremiumMembers", null);
UserController = __decorate([
    swagger_1.ApiTags('User'),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_facade_1.UserFacade])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map