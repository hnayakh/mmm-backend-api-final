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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const admin_user_entity_1 = require("./entities/admin-user.entity");
const otp_entity_1 = require("./entities/otp.entity");
const user_about_entity_1 = require("./entities/user-about.entity");
const user_basic_entity_1 = require("./entities/user-basic.entity");
const user_bio_entity_1 = require("./entities/user-bio.entity");
const user_career_entity_1 = require("./entities/user-career.entity");
const user_docs_entity_1 = require("./entities/user-docs.entity");
const user_family_background_entity_1 = require("./entities/user-family-background.entity");
const user_family_detail_entity_1 = require("./entities/user-family-detail.entity");
const user_habit_entity_1 = require("./entities/user-habit.entity");
const user_image_entity_1 = require("./entities/user-image.entity");
const user_login_entity_1 = require("./entities/user-login.entity");
const user_preference_entity_1 = require("./entities/user-preference.entity");
const user_religion_entity_1 = require("./entities/user-religion.entity");
const user_repo_1 = require("./user.repo");
const firebase_admin_1 = require("firebase-admin");
const agora_access_token_1 = require("agora-access-token");
const FIREBASE_SERVICE_ACCOUNT = require("../auth/firebaseServiceAccount.json");
const notification_entity_1 = require("./entities/notification.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_lifestyle_entity_1 = require("./entities/user-lifestyle.entity");
const user_hobbies_entity_1 = require("./entities/user-hobbies.entity");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepo, jwtService, notificationRepo) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.notificationRepo = notificationRepo;
    }
    async getAllUsers(skip, take) {
        return await this.userRepo.getAllUsers(skip, take);
    }
    async getUsersByIds(userBasicIds) {
        return await this.userRepo.getUsersByIds(userBasicIds);
    }
    async createUserBasic(fireBaseToken, createUserBasicDto) {
        const userBasic = user_basic_entity_1.UserBasic.createUserBasic(createUserBasicDto.email, createUserBasicDto.gender, createUserBasicDto.countryCode, createUserBasicDto.phoneNumber, createUserBasicDto.password, createUserBasicDto.relationship, createUserBasicDto.fireBaseToken);
        let userBasicDetails = await this.userRepo.createUserBasic(userBasic);
        const payload = {
            username: userBasicDetails.email,
            sub: userBasicDetails.id,
        };
        let authToken = this.jwtService.sign(payload);
        this.createUserLogin('M', '12e34', authToken, userBasicDetails);
        this.updateTokenToUserBasic(fireBaseToken, userBasicDetails.id);
        return userBasicDetails;
    }
    async getUserBasicById(userBasicId) {
        return await this.userRepo.getUserBasicById(userBasicId);
    }
    async createUserAbout(userBasic, createUserAboutDto) {
        const userAbout = user_about_entity_1.UserAbout.createUserAbout(createUserAboutDto.name, createUserAboutDto.dateOfBirth, createUserAboutDto.maritalStatus, createUserAboutDto.childrenStatus, createUserAboutDto.abilityStatus, createUserAboutDto.height, userBasic, createUserAboutDto.numberOfChildren);
        this.userRepo.updateUserBasic(userBasic);
        return await this.userRepo.createUserAbout(userAbout);
    }
    async createUserHabit(userBasic, createUserHabitDto) {
        const userHabit = user_habit_entity_1.UserHabit.createUserHabit(createUserHabitDto.eatingHabit, createUserHabitDto.smokingHabit, createUserHabitDto.drinkingHabit, userBasic);
        this.userRepo.updateUserBasic(userBasic);
        return await this.userRepo.createUserHabit(userHabit);
    }
    async createUserLifestyle(userBasic, createUserLifestyleDto) {
        const userLifestyle = user_lifestyle_entity_1.UserLifestyle.createUserLifestyle(createUserLifestyleDto.lifestyle, userBasic);
        this.userRepo.updateUserBasic(userBasic);
        return await this.userRepo.createUserLifestyle(userLifestyle);
    }
    async createUserHobbies(userBasic, createUserHobbiesDto) {
        const userHobbies = user_hobbies_entity_1.UserHobbies.createUserLifestyle(createUserHobbiesDto.hobbies, userBasic);
        this.userRepo.updateUserBasic(userBasic);
        return await this.userRepo.createUserHobbies(userHobbies);
    }
    async createUserFamilyDetail(userBasic, createUserFamilyDDto) {
        const ufd = user_family_detail_entity_1.UserFamilyDetail.createUserFamilyDetail(createUserFamilyDDto.fatherOccupation, createUserFamilyDDto.motherOccupation, createUserFamilyDDto.numberOfBrothers, createUserFamilyDDto.marriedNumberOfBrothers, createUserFamilyDDto.numberOfSisters, createUserFamilyDDto.marriedNumberOfSisters, userBasic);
        this.userRepo.updateUserBasic(userBasic);
        return await this.userRepo.createUserFamilyDetail(ufd);
    }
    async createUserFamilyBackground(userBasic, createUserFamilyBgDto) {
        const ufbg = user_family_background_entity_1.UserFamilyBackground.createUserFamilyBackground(createUserFamilyBgDto.familyStatus, createUserFamilyBgDto.familyValues, createUserFamilyBgDto.familyType, createUserFamilyBgDto.country, createUserFamilyBgDto.state, createUserFamilyBgDto.city, userBasic);
        this.userRepo.updateUserBasic(userBasic);
        return await this.userRepo.createUserFamilyBackground(ufbg);
    }
    async createUserCareer(userBasic, createUserCareerDto) {
        const userCareer = user_career_entity_1.UserCareer.createUserCareer(createUserCareerDto.employedIn, createUserCareerDto.occupation, createUserCareerDto.annualIncome, createUserCareerDto.highestEducation, createUserCareerDto.country, createUserCareerDto.state, createUserCareerDto.city, userBasic);
        this.userRepo.updateUserBasic(userBasic);
        return await this.userRepo.createUserCareer(userCareer);
    }
    async createUserReligion(userBasic, createUserReligionDto) {
        const userReligion = user_religion_entity_1.UserReligion.createUserReligion(createUserReligionDto.religion, createUserReligionDto.cast, createUserReligionDto.gothra, createUserReligionDto.motherTongue, createUserReligionDto.isManglik, userBasic);
        this.userRepo.updateUserBasic(userBasic);
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
        console.log('userImages');
        this.userRepo.createUserImages(userImages);
        return await this.userRepo.createUserBio(userBio);
    }
    async updateUserBioWithDocs(userBasic, createUserBioImageDto) {
        const userImages = [];
        console.log('Hello outside Doc', createUserBioImageDto.userDocImages);
        createUserBioImageDto.userDocImages.forEach((ui) => {
            console.log('Hello Doc', userBasic);
            const userImage = user_docs_entity_1.UserDocs.createUserDocs(ui.imageUrl, userBasic);
            userImages.push(userImage);
        });
        const userBio = user_bio_entity_1.UserBio.createUserDocBio(createUserBioImageDto.idProof);
        this.userRepo.updateUserImages(userImages);
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
        return await this.userRepo.updateUserBasic(user);
    }
    async updateTokenToUserBasic(fireBaseToken, id) {
        await this.userRepo.updateToken(fireBaseToken, id);
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
    async updateAdminUser(adminUser) {
        return this.userRepo.updateAdminUser(adminUser);
    }
    async createUserPreference(userBasic, cupd) {
        const userPreference = user_preference_entity_1.UserPreference.createPreference(cupd.minAge, cupd.maxAge, cupd.minHeight, cupd.maxHeight, JSON.stringify(cupd.maritalStatus), JSON.stringify(cupd.country), JSON.stringify(cupd.state), JSON.stringify(cupd.city), JSON.stringify(cupd.religion), JSON.stringify(cupd.caste), JSON.stringify(cupd.motherTongue), JSON.stringify(cupd.highestEducation), JSON.stringify(cupd.occupation), JSON.stringify(cupd.maxIncome), JSON.stringify(cupd.minIncome), JSON.stringify(cupd.dietaryHabits), JSON.stringify(cupd.drinkingHabits), JSON.stringify(cupd.smokingHabits), JSON.stringify(cupd.challenged), userBasic);
        return await this.userRepo.createUserPreference(userPreference);
    }
    async getUserPartnerPreferences(userBasicId) {
        return await this.userRepo.getUserPreferenceByUserId(userBasicId);
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
    async getMatchPercentage(userBasicId, otherUserBasicId) {
        return await this.userRepo.getMatchPercentage(userBasicId, otherUserBasicId);
    }
    async recentProfileViews(userBasicId) {
        return await this.userRepo.getRecentViews(userBasicId);
    }
    async getProifleVisitedBy(userBasicId) {
        return await this.userRepo.getProifleVisitedBy(userBasicId);
    }
    async getOnlineMembers(userBasicId) {
        return await this.userRepo.getOnlineMembers(userBasicId);
    }
    async getPremiumMembers(userBaicId) {
        return await this.userRepo.getPremiumMembers(userBaicId);
    }
    async blockProfile(ucl) {
        return await this.userRepo.blockProfile(ucl);
    }
    async unBlockUser(id) {
        return await this.userRepo.unBlockUser(id);
    }
    async getBlockedUsers(id) {
        return await this.userRepo.getBlockedUsers(id);
    }
    async getBlockedUsersForAll(id) {
        return await this.userRepo.getBlockedUsersForAll(id);
    }
    async checkIfBlocked(myBasicId, userBasicId) {
        return await this.userRepo.checkIfBlocked(myBasicId, userBasicId);
    }
    async generateAGoraToken(data) {
        console.log('check');
        const firebase_params = {
            type: FIREBASE_SERVICE_ACCOUNT.type,
            projectId: FIREBASE_SERVICE_ACCOUNT.project_id,
            privateKeyId: FIREBASE_SERVICE_ACCOUNT.private_key_id,
            privateKey: FIREBASE_SERVICE_ACCOUNT.private_key,
            clientEmail: FIREBASE_SERVICE_ACCOUNT.client_email,
            clientId: FIREBASE_SERVICE_ACCOUNT.client_id,
            authUri: FIREBASE_SERVICE_ACCOUNT.auth_uri,
            tokenUri: FIREBASE_SERVICE_ACCOUNT.token_uri,
            authProviderX509CertUrl: FIREBASE_SERVICE_ACCOUNT.auth_provider_x509_cert_url,
            clientC509CertUrl: FIREBASE_SERVICE_ACCOUNT.client_x509_cert_url,
        };
        console.log('firebase');
        if (!firebase_admin_1.default.apps.length) {
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(firebase_params),
            });
        }
        else {
            firebase_admin_1.default.app();
        }
        const APP_ID = '2408d5882f0445ec82566323785cfb66';
        const APP_CERTIFICATE = 'c18a5201243a44ebb6c3c95f124f9798';
        const { senderId, receiverId, callType } = data;
        console.log('here');
        let receiverData = await this.userRepo.getUserBasicById(receiverId);
        console.log(receiverData);
        if (!receiverData) {
            return 'Receiver Data not found';
        }
        if (receiverData) {
            const role = agora_access_token_1.RtcRole.SUBSCRIBER;
            const expirationTimeInSeconds = 3600;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const channelName = receiverData.id.toString() + receiverData.email;
            const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
            let sender = await this.userRepo.getUserBasicById(senderId);
            if (!sender) {
                return {
                    status: 0,
                    message: 'Sender not found.',
                };
            }
            const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, 0, role, privilegeExpiredTs);
            const data = {
                agoraToken: token,
                channelName: channelName,
                notificationId: '',
                name: '',
                receiverId: '',
                profileImage: '',
                status: '',
            };
            const notificationCreated = await this.userRepo.createNotification({
                senderId: senderId,
                receiverId: receiverId,
                message: callType,
                status: 0,
            });
            console.log(notificationCreated);
            console.log(sender);
            data.notificationId = notificationCreated.id.toString();
            data.name = sender.userAbouts[0].name;
            data.receiverId = receiverData.id;
            data.profileImage = sender.userImages[0].imageURL;
            data.status = 'calling';
            const payload = {
                notification: {
                    title: callType + ' call',
                },
                data: data,
            };
            const options = {
                priority: 'high',
            };
            console.log('data before', data);
            if (receiverData.fireBaseToken) {
                let result = await firebase_admin_1.default
                    .messaging()
                    .sendToDevice(receiverData.fireBaseToken, payload, options);
                if (result.failureCount !== 0) {
                    return { status: 0, message: result.results[0].error.message };
                }
                else {
                    delete data.receiverId;
                    delete data.status;
                    await this.userRepo.updateNotification({
                        id: notificationCreated.id,
                    });
                    console.log('data after', data);
                    return data;
                }
            }
            else {
                return { Message: 'Something went wrong' };
            }
        }
        else {
            return {
                status: 0,
                message: 'Receiver not found',
            };
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(2, typeorm_2.InjectRepository(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [user_repo_1.UserRepo,
        jwt_1.JwtService,
        typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map