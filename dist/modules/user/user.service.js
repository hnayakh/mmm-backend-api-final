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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const admin_user_entity_1 = require("./entities/admin-user.entity");
const otp_entity_1 = require("./entities/otp.entity");
const user_about_entity_1 = require("./entities/user-about.entity");
const user_basic_entity_1 = require("./entities/user-basic.entity");
const user_bio_entity_1 = require("./entities/user-bio.entity");
const user_career_entity_1 = require("./entities/user-career.entity");
const user_family_background_entity_1 = require("./entities/user-family-background.entity");
const user_family_detail_entity_1 = require("./entities/user-family-detail.entity");
const user_habit_entity_1 = require("./entities/user-habit.entity");
const user_image_entity_1 = require("./entities/user-image.entity");
const user_login_entity_1 = require("./entities/user-login.entity");
const user_preference_entity_1 = require("./entities/user-preference.entity");
const user_religion_entity_1 = require("./entities/user-religion.entity");
const user_repo_1 = require("./user.repo");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getAllUsers(skip, take) {
        return await this.userRepo.getAllUsers(skip, take);
    }
    async getUsersByIds(userBasicIds) {
        return await this.userRepo.getUsersByIds(userBasicIds);
    }
    async createUserBasic(createUserBasicDto) {
        const userBasic = user_basic_entity_1.UserBasic.createUserBasic(createUserBasicDto.email, createUserBasicDto.gender, createUserBasicDto.countryCode, createUserBasicDto.phoneNumber, createUserBasicDto.password, createUserBasicDto.relationship);
        return await this.userRepo.createUserBasic(userBasic);
    }
    async getUserBasicById(userBasicId) {
        return await this.userRepo.getUserBasicById(userBasicId);
    }
    async createUserAbout(userBasic, createUserAboutDto) {
        const userAbout = user_about_entity_1.UserAbout.createUserAbout(createUserAboutDto.name, createUserAboutDto.dateOfBirth, createUserAboutDto.maritalStatus, createUserAboutDto.childrenStatus, createUserAboutDto.abilityStatus, createUserAboutDto.height, userBasic, createUserAboutDto.numberOfChildren);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.Habit);
        this.userRepo.updateUserBasic(updatedUserBasic);
        return await this.userRepo.createUserAbout(userAbout);
    }
    async createUserHabit(userBasic, createUserHabitDto) {
        const userHabit = user_habit_entity_1.UserHabit.createUserHabit(createUserHabitDto.eatingHabit, createUserHabitDto.smokingHabit, createUserHabitDto.drinkingHabit, userBasic);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.Religion);
        this.userRepo.updateUserBasic(updatedUserBasic);
        return await this.userRepo.createUserHabit(userHabit);
    }
    async createUserFamilyDetail(userBasic, createUserFamilyDDto) {
        const ufd = user_family_detail_entity_1.UserFamilyDetail.createUserFamilyDetail(createUserFamilyDDto.fatherOccupation, createUserFamilyDDto.motherOccupation, createUserFamilyDDto.numberOfBrothers, createUserFamilyDDto.marriedNumberOfBrothers, createUserFamilyDDto.numberOfSisters, createUserFamilyDDto.marriedNumberOfSisters, userBasic);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.BioWithImages);
        this.userRepo.updateUserBasic(updatedUserBasic);
        return await this.userRepo.createUserFamilyDetail(ufd);
    }
    async createUserFamilyBackground(userBasic, createUserFamilyBgDto) {
        const ufbg = user_family_background_entity_1.UserFamilyBackground.createUserFamilyBackground(createUserFamilyBgDto.familyStatus, createUserFamilyBgDto.familyValues, createUserFamilyBgDto.familyType, createUserFamilyBgDto.country, createUserFamilyBgDto.state, createUserFamilyBgDto.city, userBasic);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.FamilyDetail);
        this.userRepo.updateUserBasic(updatedUserBasic);
        return await this.userRepo.createUserFamilyBackground(ufbg);
    }
    async createUserCareer(userBasic, createUserCareerDto) {
        const userCareer = user_career_entity_1.UserCareer.createUserCareer(createUserCareerDto.employedIn, createUserCareerDto.occupation, createUserCareerDto.annualIncome, createUserCareerDto.highestEducation, createUserCareerDto.country, createUserCareerDto.state, createUserCareerDto.city, userBasic);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.FamilyBackground);
        this.userRepo.updateUserBasic(updatedUserBasic);
        return await this.userRepo.createUserCareer(userCareer);
    }
    async createUserReligion(userBasic, createUserReligionDto) {
        const userReligion = user_religion_entity_1.UserReligion.createUserReligion(createUserReligionDto.religion, createUserReligionDto.cast, createUserReligionDto.gothra, createUserReligionDto.motherTongue, createUserReligionDto.isManglik, userBasic);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.Career);
        this.userRepo.updateUserBasic(updatedUserBasic);
        return await this.userRepo.createUserReligion(userReligion);
    }
    async createUserBioWithImages(userBasic, createUserBioImageDto) {
        const userImages = [];
        let isDefaultImage = true;
        createUserBioImageDto.userImages.forEach((ui) => {
            const userImage = user_image_entity_1.UserImage.createUserImage(ui.imageUrl, isDefaultImage, userBasic);
            userImages.push(userImage);
            isDefaultImage = false;
        });
        const userBio = user_bio_entity_1.UserBio.createUserBio(createUserBioImageDto.aboutMe, userBasic);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.Preferences);
        this.userRepo.updateUserBasic(updatedUserBasic);
        this.userRepo.createUserImages(userImages);
        return await this.userRepo.createUserBio(userBio);
    }
    async getUserBasicByEmail(email) {
        return await this.userRepo.getUserBasicByEmail(email);
    }
    async getUserBasicByPhone(phoneNumber) {
        return await this.userRepo.getUserBasicByPhone(phoneNumber);
    }
    async createUserLogin(deviceType, deviceId, authToken, userBasic) {
        const userLogin = user_login_entity_1.UserLogin.createUserLoginRecord(deviceType, deviceId, authToken, userBasic);
        return await this.userRepo.createUserLoginRecord(userLogin);
    }
    async createOtp(email, phoneNumber, otp) {
        const otpObj = otp_entity_1.Otp.createOtp(phoneNumber, email, otp);
        return await this.userRepo.createOtp(otpObj);
    }
    async updateOtpStatus(phoneNumber, email, otp) {
        const otpObj = await this.getOtpForVerification(phoneNumber, email);
        otpObj.updateStatus();
        return await this.userRepo.updateOtpStatus(otpObj);
    }
    async getOtpForVerification(phoneNumber, email) {
        return await this.userRepo.getOtpForVerification(phoneNumber, email);
    }
    async getUserById(userBasicId) {
        return await this.userRepo.getUserById(userBasicId);
    }
    async updateUserBasic(user) {
        await this.userRepo.updateUserBasic(user);
    }
    async updateUserAboutStatus(userAbout, profileUpdationStatus) {
        const updatedUserAbout = userAbout.updateProfileUpdationStatus(profileUpdationStatus);
        return await this.userRepo.updateUserAbout(updatedUserAbout);
    }
    async updateUserHabitStatus(userHabit, profileUpdationStatus) {
        const updatedUserHabit = userHabit.updateProfileUpdationStatus(profileUpdationStatus);
        return await this.userRepo.updateUserHabit(updatedUserHabit);
    }
    async updateUserReligionStatus(userReligion, profileUpdationStatus) {
        const updatedUserReligion = userReligion.updateProfileUpdationStatus(profileUpdationStatus);
        return await this.userRepo.updateUserReligion(updatedUserReligion);
    }
    async updateUserCareerStatus(userCareer, profileUpdationStatus) {
        const updatedUserCareer = userCareer.updateProfileUpdationStatus(profileUpdationStatus);
        return await this.userRepo.updateUserCareer(updatedUserCareer);
    }
    async updateUserFamilyBackgroundStatus(userFamilyBackground, profileUpdationStatus) {
        const updatedUserFamilyBackground = userFamilyBackground.updateProfileUpdationStatus(profileUpdationStatus);
        return await this.userRepo.updateUserFamilyBackground(updatedUserFamilyBackground);
    }
    async updateUserFamilyDetailStatus(ufd, profileUpdationStatus) {
        const updatedUserFamilyDetail = ufd.updateProfileUpdationStatus(profileUpdationStatus);
        return await this.userRepo.updateUserFamilyDetail(updatedUserFamilyDetail);
    }
    async updateUserBioStatus(userBio, profileUpdationStatus) {
        const updatedUserBio = userBio.updateProfileUpdationStatus(profileUpdationStatus);
        return await this.userRepo.updateUserBio(updatedUserBio);
    }
    async updateUserImageStatus(userImages, profileUpdationStatus) {
        let updatedUserImages = [];
        userImages.forEach((ui) => {
            const updatedUserImage = ui.updateProfileUpdationStatus(profileUpdationStatus);
            updatedUserImages.push(updatedUserImage);
        });
        return await this.userRepo.updateUserImages(updatedUserImages);
    }
    async getUserGenderById(userBasicId) {
        return await this.userRepo.getUserGenderById(userBasicId);
    }
    async getUserGenderAndPreference(userBasicId) {
        return await this.userRepo.getUserGenderAndPreference(userBasicId);
    }
    async getProfilesByPreference(queryString) {
        return await this.userRepo.getProfilesByPreference(queryString);
    }
    async getAdminUsers() {
        return this.userRepo.getAdminUsers();
    }
    async getAdminUserByEmail(email) {
        return this.userRepo.getAdminUserByEmail(email);
    }
    async createAdminUser(createAdminUserDto) {
        const adminUser = admin_user_entity_1.AdminUser.createAdminUser(createAdminUserDto.firstName, createAdminUserDto.lastName, createAdminUserDto.email, createAdminUserDto.gender, createAdminUserDto.phoneNumber, createAdminUserDto.password, createAdminUserDto.role);
        return this.userRepo.createAdminUser(adminUser);
    }
    async createUserPreference(userBasic, cupd) {
        const userPreference = user_preference_entity_1.UserPreference.createPreference(cupd.minAge, cupd.maxAge, cupd.minHeight, cupd.maxHeight, JSON.stringify(cupd.maritalStatus), JSON.stringify(cupd.country), JSON.stringify(cupd.state), JSON.stringify(cupd.city), JSON.stringify(cupd.religion), JSON.stringify(cupd.caste), JSON.stringify(cupd.motherTongue), JSON.stringify(cupd.highestEducation), JSON.stringify(cupd.occupation), JSON.stringify(cupd.maxIncome), JSON.stringify(cupd.minIncome), JSON.stringify(cupd.dietaryHabits), JSON.stringify(cupd.drinkingHabits), JSON.stringify(cupd.smokingHabits), JSON.stringify(cupd.challenged), userBasic);
        const updatedUserBasic = userBasic.updateRegistrationStep(miscellaneous_enum_1.RegistrationSteps.PendingVerification);
        this.userRepo.updateUserBasic(updatedUserBasic);
        return await this.userRepo.createUserPreference(userPreference);
    }
    async getAllUserDetailsById(userBasicId) {
        return await this.userRepo.getAllUserDetailsById(userBasicId);
    }
    async getRequiredLoginDetails(userBasicId) {
        return await this.userRepo.getRequiredLoginDetails(userBasicId);
    }
    async getAppUsersForAdmin(quesryString) {
        return await this.userRepo.getAppUsersForAdmin(quesryString);
    }
    async visitedProfile(visitedBy, visitedTo) {
        const userVisitedBy = await this.getUserById(visitedBy);
        const userVisitedTo = await this.getUserById(visitedTo);
        return await this.userRepo.visitedProfile(userVisitedBy, userVisitedTo);
    }
    async recentProfileViews(userBasicId) {
        return await this.userRepo.getRecentViews(userBasicId);
    }
    async getProifleVisitedBy(userBasicId) {
        return await this.userRepo.getProifleVisitedBy(userBasicId);
    }
    async getPremiumMembers(userBaicId) {
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repo_1.UserRepo])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map