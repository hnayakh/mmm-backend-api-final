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
exports.UserFacade = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const s3_service_1 = require("../../shared/services/s3.service");
const master_service_1 = require("../master/master.service");
const user_service_1 = require("./user.service");
const shortid = require("shortid");
const fs = require('fs');
const resolve = require('path').resolve;
const app_root = require("app-root-path");
const _ = require("lodash");
const connect_service_1 = require("../connect/connect.service");
const typeorm_1 = require("typeorm");
const religion_1 = require("../../shared/constants/profile-master-data/religion");
const mother_tongue_1 = require("../../shared/constants/profile-master-data/mother-tongue");
const cast_subcaste_1 = require("../../shared/constants/profile-master-data/cast-subcaste");
const block_user_entity_1 = require("./entities/block-user.entity");
let UserFacade = class UserFacade {
    constructor(userService, masterService, s3Service, connectService) {
        this.userService = userService;
        this.masterService = masterService;
        this.s3Service = s3Service;
        this.connectService = connectService;
    }
    async getAllUsers(skip, take, isVerified) {
        const users = await this.userService.getAllUsers(skip, take);
        if (isVerified != null && isVerified == 'true') {
            return users.filter((x) => x.activationStatus == miscellaneous_enum_1.ActivationStatus.Verified);
        }
        else {
            return users;
        }
    }
    async updateUserRegistrationStep(userBasicId, step) {
        const user = await this.userService.getUserById(userBasicId);
        user.updateRegistrationStep(step);
        return await this.userService.updateUserBasic(user);
    }
    async createUserBasic(fireBaseToken, createUserBasicDto) {
        const user = await this.userService.getUserBasicByEmail(createUserBasicDto.email);
        if (!_.isEmpty(user)) {
            throw new common_1.HttpException('Email is already registred.', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return await this.userService.createUserBasic(fireBaseToken, createUserBasicDto);
    }
    async createUserAbout(createUserAboutDto) {
        const userBasic = await this.userService.getUserBasicById(createUserAboutDto.userBasicId);
        return await this.userService.createUserAbout(userBasic, createUserAboutDto);
    }
    async createUserHabit(createUserHabitDto) {
        const userBasic = await this.userService.getUserBasicById(createUserHabitDto.userBasicId);
        return await this.userService.createUserHabit(userBasic, createUserHabitDto);
    }
    async createUserLifestyle(createUserLifestyleDto) {
        const userBasic = await this.userService.getUserBasicById(createUserLifestyleDto.userBasicId);
        return await this.userService.createUserLifestyle(userBasic, createUserLifestyleDto);
    }
    async createUserHobbies(createUserHobbiesDto) {
        const userBasic = await this.userService.getUserBasicById(createUserHobbiesDto.userBasicId);
        return await this.userService.createUserHobbies(userBasic, createUserHobbiesDto);
    }
    async createUserReligion(createUserReligionDto) {
        const userBasic = await this.userService.getUserBasicById(createUserReligionDto.userBasicId);
        return await this.userService.createUserReligion(userBasic, createUserReligionDto);
    }
    async createUserCareer(createUserCareerDto) {
        const userBasic = await this.userService.getUserBasicById(createUserCareerDto.userBasicId);
        return await this.userService.createUserCareer(userBasic, createUserCareerDto);
    }
    async createUserFamilyBackground(createUserFamilyBgDto) {
        const userBasic = await this.userService.getUserBasicById(createUserFamilyBgDto.userBasicId);
        return await this.userService.createUserFamilyBackground(userBasic, createUserFamilyBgDto);
    }
    async createUserFamilyDetail(createUserFamilyDDto) {
        const userBasic = await this.userService.getUserBasicById(createUserFamilyDDto.userBasicId);
        return await this.userService.createUserFamilyDetail(userBasic, createUserFamilyDDto);
    }
    async uploadUserImages(userId, files) {
        let promiseArr = [];
        let imageArr = [];
        for (let i = 0; i < files.length; i++) {
            let rand = shortid.generate();
            const key = `${userId}/${rand}_${files[i].originalname}`;
            promiseArr.push(await this.s3Service.uploadDirectlyToS3(key, files[i]));
            imageArr.push(`${process.env.S3_PREFIX_URL}${key}`);
        }
        await Promise.all(promiseArr);
        return imageArr;
    }
    async uploadUserDocImages(userId, files) {
        let docPromiseArr = [];
        let docImageArr = [];
        let docIdProof = '';
        for (let i = 0; i < files.length; i++) {
            let rand = shortid.generate();
            const key = `${userId}/${rand}_${files[i].originalname}`;
            docPromiseArr.push(await this.s3Service.uploadDirectlyToS3(key, files[i]));
            docImageArr.push(`${process.env.S3_PREFIX_URL}${key}`);
        }
        await Promise.all(docPromiseArr);
        console.log('Doc Image Array');
        return docImageArr;
    }
    async createUserBioWithImages(createUserBioImageDto) {
        const userBasic = await this.userService.getUserBasicById(createUserBioImageDto.userBasicId);
        console.log('createUserBioImageDto', createUserBioImageDto);
        const res = await this.userService.createUserBioWithImages(userBasic, createUserBioImageDto);
        return res;
    }
    async updateUserBioWithDocs(updateUserDocsDto) {
        const userBasic = await this.userService.getUserBasicById(updateUserDocsDto.userBasicId);
        const res = await this.userService.updateUserBioWithDocs(userBasic, updateUserDocsDto);
        return res;
    }
    async rejectUserByAdmin(userBasicId) {
        const user = await this.userService.getUserById(userBasicId);
        user.updateStatus(miscellaneous_enum_1.ActivationStatus.Rejected, miscellaneous_enum_1.RegistrationSteps.Completed);
        await this.userService.updateUserBasic(user);
    }
    async verifyUserByAdmin(userBasicId) {
        const user = await this.userService.getUserById(userBasicId);
        user.updateStatus(miscellaneous_enum_1.ActivationStatus.Verified, miscellaneous_enum_1.RegistrationSteps.Completed);
        await this.userService.updateUserBasic(user);
        this.updateChildStatusesAfterAdminVerification(user);
    }
    async updateChildStatusesAfterAdminVerification(user) {
        const userAbout = user.userAbouts.find((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserAboutStatus(userAbout, miscellaneous_enum_1.ProfileUpdationStatus.Current);
        const userHabits = user.userHabits.find((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserHabitStatus(userHabits, miscellaneous_enum_1.ProfileUpdationStatus.Current);
        const userReligions = user.userReligions.find((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserReligionStatus(userReligions, miscellaneous_enum_1.ProfileUpdationStatus.Current);
        const userCareers = user.userCareers.find((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserCareerStatus(userCareers, miscellaneous_enum_1.ProfileUpdationStatus.Current);
        const userFamilyBackgrounds = user.userFamilyBackgrounds.find((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserFamilyBackgroundStatus(userFamilyBackgrounds, miscellaneous_enum_1.ProfileUpdationStatus.Current);
        const userFamilyDetails = user.userFamilyDetails.find((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserFamilyDetailStatus(userFamilyDetails, miscellaneous_enum_1.ProfileUpdationStatus.Current);
        const userBios = user.userBios.find((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserBioStatus(userBios, miscellaneous_enum_1.ProfileUpdationStatus.Current);
        const userImages = user.userImages.filter((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
        await this.userService.updateUserImageStatus(userImages, miscellaneous_enum_1.ProfileUpdationStatus.Current);
    }
    async getUserFromDisplayId(userBasicId, displayId) {
        let queryString = `SELECT * FROM users_view_admin as uv WHERE uv.displayId = '${displayId}'`;
        const result = await this.userService.getProfilesByPreference(queryString);
        let uniqueUsers = [];
        result.forEach((r) => {
            let dup = uniqueUsers.find((re) => re.id == r.id);
            if (_.isEmpty(dup)) {
                uniqueUsers.push(r);
            }
        });
        const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isLiked: false,
                sent: false,
                requested: false,
                isConnected: false,
                id: '',
            };
            let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isLiked = true),
                    (tempObj.requested = true),
                    (tempObj.isConnected =
                        isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectOne.id;
            }
            let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isLiked = true),
                    (tempObj.sent = true),
                    (tempObj.isConnected =
                        isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectTwo.id;
            }
            uu['interestStatus'] = tempObj;
        });
        const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isConnected: false,
                id: null,
            };
            let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
            }
            let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
            }
            uu['connectStatus'] = tempObj;
        });
        return uniqueUsers;
    }
    async getProfilesByPreference(userBasicId, queryObj) {
        console.log('queryObj', queryObj);
        let userGenderAndPreference = await this.userService.getUserGenderAndPreference(userBasicId);
        console.log('USERGENDERPREF', userGenderAndPreference);
        if (userGenderAndPreference) {
            const religionInClause = JSON.parse(userGenderAndPreference.religion.toString().replace("'", ''))
                .map((religion) => "'" + religion + "'")
                .join();
            let genderPreference = 0;
            if (userGenderAndPreference.gender == 0) {
                genderPreference = 1;
            }
            let queryString = `SELECT * FROM users_view_admin uv WHERE uv.gender = ${genderPreference}`;
            if (religionInClause.length > 0) {
                queryString = queryString + ` AND uv.religion in (${religionInClause})`;
            }
            console.log('queryString', queryString);
            queryString =
                queryString +
                    ` AND uv.registrationStep in (10, 11) AND uv.activationStatus = 1;`;
            console.log(queryString);
            const result = await this.userService.getProfilesByPreference(queryString);
            let uniqueUsers = [];
            result.forEach((r) => {
                let dup = uniqueUsers.find((re) => re.id == r.id);
                if (_.isEmpty(dup)) {
                    uniqueUsers.push(r);
                }
            });
            const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
            const blockedUser = await this.userService.getBlockedUsersForAll(userBasicId);
            const blockedUserWhom = await this.userService.getBlockedUsersWhom(userBasicId);
            console.log('blockedUser', blockedUser);
            uniqueUsers.forEach((uu) => {
                let tempObj = {
                    isLiked: false,
                    sent: false,
                    requested: false,
                    isConnected: false,
                    id: '',
                };
                let blockObj = {
                    isBlocked: false,
                    id: '',
                };
                let requiredObj = {};
                let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == uu.id);
                let isBlockedOne = blockedUserWhom.find((u) => u.block_whom == uu.id);
                let isBlockedTwo = blockedUser.find((u) => u.block_who == uu.id);
                console.log('isBlockedOne', isBlockedOne);
                console.log('isBlockedTwo', isBlockedTwo);
                if (isBlockedOne != null) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedOne.id;
                }
                if (isBlockedTwo != null) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedOne.id;
                }
                if (isConnectOne != null) {
                    (tempObj.isLiked = true),
                        (tempObj.requested = true),
                        (tempObj.isConnected =
                            isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                ? true
                                : false);
                    tempObj.id = isConnectOne.id;
                    requiredObj = isConnectOne;
                }
                let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == uu.id);
                if (isConnectTwo != null) {
                    (tempObj.isLiked = true),
                        (tempObj.sent = true),
                        (tempObj.isConnected =
                            isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                ? true
                                : false);
                    tempObj.id = isConnectTwo.id;
                    requiredObj = isConnectTwo;
                }
                uu['interestStatus'] = tempObj;
                uu['UserRequestStatus'] = requiredObj;
                uu['BlockStatus'] = blockObj;
            });
            console.log('UserRequestStatus', connectUsers);
            const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
            uniqueUsers.forEach((uu) => {
                let tempObj = {
                    isConnected: false,
                    id: null,
                };
                let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
                if (isConnectOne != null) {
                    (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                }
                let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
                if (isConnectTwo != null) {
                    (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                }
                uu['connectStatus'] = tempObj;
            });
            uniqueUsers['UserRequestStatus'] = connectedUserForCall;
            if (blockedUser.length > 0) {
                blockedUser.forEach((e) => {
                    uniqueUsers = uniqueUsers.filter((x) => x.id != e.block_whom);
                });
            }
            if (blockedUserWhom.length > 0) {
                blockedUserWhom.forEach((e) => {
                    uniqueUsers = uniqueUsers.filter((x) => x.id != e.block_who);
                });
            }
            return uniqueUsers;
        }
        else {
            return [];
        }
    }
    async getProfilesFilterByPreference(userBasicId, queryObj) {
        try {
            console.log('queryObj', queryObj);
            let userGenderAndPreference = queryObj;
            let userDetails = await this.userService.getUserGenderAndPreference(userBasicId);
            console.log('USERGENDERPREF', userDetails);
            if (userGenderAndPreference) {
                const religionInClause = userGenderAndPreference.religion
                    .map((religion) => "'" + religion + "'")
                    .join();
                const casteInClause = userGenderAndPreference.caste
                    .map((caste) => "'" + caste + "'")
                    .join();
                const motherTongueClause = userGenderAndPreference.motherTongue
                    .map((mothertongue) => "'" + mothertongue + "'")
                    .join();
                const eatingHabitClause = userGenderAndPreference.dietaryHabits
                    .map((eatinghabit) => "'" + eatinghabit + "'")
                    .join();
                const drinkingHabitClause = userGenderAndPreference.drinkingHabits
                    .map((drinkinghabit) => "'" + drinkinghabit + "'")
                    .join();
                const smokingHabitClause = userGenderAndPreference.smokingHabits
                    .map((smokinghabit) => "'" + smokinghabit + "'")
                    .join();
                const maritalStatusClause = userGenderAndPreference.maritalStatus
                    .map((maritalstatus) => "'" + maritalstatus + "'")
                    .join();
                const minIncomeClause = userGenderAndPreference.minIncome;
                const maxIncomeClause = userGenderAndPreference.minIncome;
                let genderPreference = 0;
                if (userGenderAndPreference.gender == 0) {
                    genderPreference = 1;
                }
                let queryString = `SELECT * FROM users_view_admin uv WHERE uv.gender = ${genderPreference}`;
                if (userGenderAndPreference.minAge != null) {
                    queryString =
                        queryString + ` AND uv.age >= ${userGenderAndPreference.minAge}`;
                }
                if (userGenderAndPreference.maxAge != null) {
                    queryString =
                        queryString + ` AND uv.age <= ${userGenderAndPreference.maxAge}`;
                }
                if (userGenderAndPreference.minHeight != null) {
                    queryString =
                        queryString +
                            ` AND uv.height >= ${userGenderAndPreference.minHeight}`;
                }
                if (userGenderAndPreference.maxHeight != null) {
                    queryString =
                        queryString +
                            ` AND uv.height <= ${userGenderAndPreference.maxHeight}`;
                }
                if (casteInClause.length > 0) {
                    queryString = queryString + ` AND uv.cast in (${casteInClause})`;
                }
                if (religionInClause.length > 0) {
                    queryString =
                        queryString + ` AND uv.religion in (${religionInClause})`;
                }
                if (motherTongueClause.length > 0) {
                    queryString =
                        queryString + ` AND uv.motherTongue in (${motherTongueClause})`;
                }
                if (smokingHabitClause.length) {
                    queryString =
                        queryString + ` AND uv.smokingHabit in (${smokingHabitClause})`;
                }
                if (eatingHabitClause.length) {
                    queryString =
                        queryString + ` AND uv.eatingHabit in (${eatingHabitClause})`;
                }
                if (drinkingHabitClause.length) {
                    queryString =
                        queryString + ` AND uv.drinkingHabit in (${drinkingHabitClause})`;
                }
                if (maritalStatusClause.length) {
                    queryString =
                        queryString + ` AND uv.maritalStatus in (${maritalStatusClause})`;
                }
                if (minIncomeClause.length) {
                    queryString =
                        queryString + ` AND uv.annualIncome >= ${minIncomeClause[0]}`;
                }
                if (maxIncomeClause.length) {
                    queryString =
                        queryString + ` AND uv.annualIncome <= ${maxIncomeClause[0]}`;
                }
                console.log('queryString', queryString);
                queryString =
                    queryString +
                        ` AND uv.registrationStep in (10, 11) AND uv.activationStatus = 1;`;
                console.log(queryString);
                const result = await this.userService.getProfilesByPreference(queryString);
                let uniqueUsers = [];
                result.forEach((r) => {
                    let dup = uniqueUsers.find((re) => re.id == r.id);
                    if (_.isEmpty(dup)) {
                        uniqueUsers.push(r);
                    }
                });
                const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
                const blockedUser = await this.userService.getBlockedUsersForAll(userBasicId);
                const blockedUserWhom = await this.userService.getBlockedUsersWhom(userBasicId);
                console.log('blockedUser', blockedUser);
                uniqueUsers.forEach((uu) => {
                    let tempObj = {
                        isLiked: false,
                        sent: false,
                        requested: false,
                        isConnected: false,
                        id: '',
                    };
                    let blockObj = {
                        isBlocked: false,
                        id: '',
                    };
                    let requiredObj = {};
                    let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == uu.id);
                    let isBlockedOne = blockedUserWhom.find((u) => u.block_whom == uu.id);
                    let isBlockedTwo = blockedUser.find((u) => u.block_who == uu.id);
                    console.log('isBlockedOne', isBlockedOne);
                    console.log('isBlockedTwo', isBlockedTwo);
                    if (isBlockedOne != null) {
                        blockObj.isBlocked = true;
                        blockObj.id = isBlockedOne.id;
                    }
                    if (isBlockedTwo != null) {
                        blockObj.isBlocked = true;
                        blockObj.id = isBlockedOne.id;
                    }
                    if (isConnectOne != null) {
                        (tempObj.isLiked = true),
                            (tempObj.requested = true),
                            (tempObj.isConnected =
                                isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                    ? true
                                    : false);
                        tempObj.id = isConnectOne.id;
                        requiredObj = isConnectOne;
                    }
                    let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == uu.id);
                    if (isConnectTwo != null) {
                        (tempObj.isLiked = true),
                            (tempObj.sent = true),
                            (tempObj.isConnected =
                                isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                    ? true
                                    : false);
                        tempObj.id = isConnectTwo.id;
                        requiredObj = isConnectTwo;
                    }
                    uu['interestStatus'] = tempObj;
                    uu['UserRequestStatus'] = requiredObj;
                    uu['BlockStatus'] = blockObj;
                });
                console.log('UserRequestStatus', connectUsers);
                const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
                uniqueUsers.forEach((uu) => {
                    let tempObj = {
                        isConnected: false,
                        id: null,
                    };
                    let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
                    if (isConnectOne != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                    }
                    let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
                    if (isConnectTwo != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                    }
                    uu['connectStatus'] = tempObj;
                });
                uniqueUsers['UserRequestStatus'] = connectedUserForCall;
                if (blockedUser.length > 0) {
                    blockedUser.forEach((e) => {
                        uniqueUsers = uniqueUsers.filter((x) => x.id != e.block_whom);
                    });
                }
                if (blockedUserWhom.length > 0) {
                    blockedUserWhom.forEach((e) => {
                        uniqueUsers = uniqueUsers.filter((x) => x.id != e.block_who);
                    });
                }
                return uniqueUsers;
            }
            else {
                return [];
            }
        }
        catch (e) {
            console.log(e);
            return e;
        }
    }
    async getFilteredUsers(userFilterDto) {
        let userGenderAndPreference = await this.userService.getUserGenderAndPreference(userFilterDto.userBasicId);
        let genderPreference = 0;
        if (userGenderAndPreference.gender == 0) {
            genderPreference = 1;
        }
        let queryString = `SELECT * FROM users_view_admin uv WHERE uv.gender = ${genderPreference}`;
        if (userFilterDto.minAge != null) {
            queryString = queryString + ` AND uv.age >= ${userFilterDto.minAge}`;
        }
        if (userFilterDto.maxAge != null) {
            queryString = queryString + ` AND uv.age <= ${userFilterDto.maxAge}`;
        }
        if (userFilterDto.minHeight != null) {
            queryString =
                queryString + ` AND uv.height >= ${userFilterDto.minHeight}`;
        }
        if (userFilterDto.maxHeight != null) {
            queryString =
                queryString + ` AND uv.height <= ${userFilterDto.maxHeight}`;
        }
        queryString = queryString + ` AND uv.registrationStep in (10, 11);`;
        console.log(queryString);
        const result = await this.userService.getProfilesByPreference(queryString);
        let uniqueUsers = [];
        result.forEach((r) => {
            let dup = uniqueUsers.find((re) => re.id == r.id);
            if (_.isEmpty(dup)) {
                uniqueUsers.push(r);
            }
        });
        const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userFilterDto.userBasicId);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isLiked: false,
                sent: false,
                requested: false,
                isConnected: false,
            };
            let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isLiked = true),
                    (tempObj.requested = true),
                    (tempObj.isConnected =
                        isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
            }
            let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isLiked = true),
                    (tempObj.sent = true),
                    (tempObj.isConnected =
                        isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
            }
            uu['connectStatus'] = tempObj;
        });
        const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userFilterDto.userBasicId);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isConnectedForCallMessage: false,
                userConnectRequestId: null,
            };
            let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isConnectedForCallMessage = true),
                    (tempObj.userConnectRequestId = isConnectOne.id);
            }
            let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isConnectedForCallMessage = true),
                    (tempObj.userConnectRequestId = isConnectOne.id);
            }
            uu['connectRequestCallMessageStatus'] = tempObj;
        });
        return uniqueUsers;
    }
    async getPresignedUrl(userBasicId, fileKey, contentType) {
        return await this.s3Service.getPresignedUrl(fileKey, contentType);
    }
    async getAdminUsers() {
        return this.userService.getAdminUsers();
    }
    async createAdminUser(createAdminUserDto) {
        const adminUser = await this.userService.getAdminUserByEmail(createAdminUserDto.email);
        if (!_.isEmpty(adminUser)) {
            throw new common_1.HttpException('Email is already registred.', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return this.userService.createAdminUser(createAdminUserDto);
    }
    async updateAdminUser(createAdminUserDto) {
        return this.userService.updateAdminUser(createAdminUserDto);
    }
    async createUserPreference(createUserPreferenceDto) {
        const userBasic = await this.userService.getUserById(createUserPreferenceDto.userBasicId);
        const res = await this.userService.createUserPreference(userBasic, createUserPreferenceDto);
        console.log('result', res);
        delete res.userBasic;
        return res;
    }
    async getUserPartnerPreferences(userBasicId) {
        const userBasic = await this.userService.getUserById(userBasicId);
        const res = await this.userService.getUserPartnerPreferences(userBasicId);
        return res;
    }
    async getUserDeatailById(userBasicId, myBasicId) {
        try {
            const userDetails = await this.userService.getAllUserDetailsById(userBasicId);
            let blockStatus = {};
            let blockDetails = {
                isBlocked: false,
                id: '',
            };
            let userReqDet = [];
            if (myBasicId) {
                console.log(myBasicId);
                const entityManager = typeorm_1.getManager();
                const rawQuery = `SELECT * from user_requests where requestingUserBasicId='${myBasicId}' AND requestedUserBasicId='${userBasicId}'`;
                userReqDet = await entityManager.query(rawQuery);
                console.log(rawQuery);
                console.log('userReqDet', userReqDet);
                let blockRes = await this.userService.checkIfBlocked(myBasicId, userBasicId);
                blockStatus = blockRes;
                console.log('blockRes', blockStatus);
                if (blockRes) {
                    blockDetails.isBlocked = true;
                    blockDetails.id = blockRes.id;
                }
            }
            if (userDetails.userCareers) {
                userDetails.userCareers = userDetails.userCareers.filter((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Current ||
                    x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending ||
                    x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Archived);
            }
            userDetails.userFamilyBackgrounds =
                userDetails.userFamilyBackgrounds.filter((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Current ||
                    x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending ||
                    x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Archived);
            for (let i = 0; i < userDetails.userCareers.length; i++) {
                let country = await this.masterService.getCountry(userDetails.userCareers[i].country);
                let state = await this.masterService.getState(userDetails.userCareers[i].state);
                let city = await this.masterService.getCity(userDetails.userCareers[i].city);
                userDetails.userCareers[i]['countryName'] = country['name'];
                userDetails.userCareers[i]['stateName'] = state['name'];
                userDetails.userCareers[i]['cityName'] = city ? city['name'] : null;
            }
            if (userDetails.userReligions && userDetails.userReligions.length) {
                for (let i = 0; i < userDetails.userReligions.length; i++) {
                    let religionName = userDetails.userReligions[i].religion;
                    let religionId = religion_1.religion.filter((x) => x.text == religionName);
                    userDetails.userReligions[i]['religionId'] = religionId;
                }
            }
            if (userDetails.userReligions && userDetails.userReligions.length) {
                for (let i = 0; i < userDetails.userReligions.length; i++) {
                    let casteName = userDetails.userReligions[i].religion;
                    let subCastName = userDetails.userReligions[i].cast;
                    let motherTongueName = userDetails.userReligions[i].motherTongue;
                    let motherTongueId = mother_tongue_1.motherTongue.filter((x) => x.text == motherTongueName)[0].id;
                    console.log('casteName', userDetails.userReligions[i].religion);
                    console.log('subCasteName', subCastName);
                    userDetails.userReligions[i]['casteName'] = casteName;
                    userDetails.userReligions[i]['subCasteName'] = subCastName;
                    userDetails.userReligions[i]['motherTongueId'] = motherTongueId;
                }
            }
            if (userDetails.userHobbies && userDetails.userHobbies.length) {
                for (let i = 0; i < userDetails.userHobbies.length; i++) {
                    let hobbies = userDetails.userHobbies[i].hobbies;
                    console.log('HOBBIES', userDetails.userHobbies[i].hobbies);
                    userDetails.userHobbies[i]['hobbies'] = hobbies;
                }
            }
            if (userDetails.userLifestyle && userDetails.userLifestyle.length) {
                for (let i = 0; i < userDetails.userLifestyle.length; i++) {
                    let lifestyle = userDetails.userLifestyle[i].lifestyle;
                    console.log('LIFESTYLE', userDetails.userLifestyle[i].lifestyle);
                    userDetails.userLifestyle[i]['lifestyle'] = lifestyle;
                }
            }
            if (userDetails.userHobbies && userDetails.userHobbies.length) {
                for (let i = 0; i < userDetails.userHobbies.length; i++) {
                    let hobbies = userDetails.userHobbies[i].hobbies;
                    console.log('HOBBIES', userDetails.userHobbies[i].hobbies);
                    userDetails.userHobbies[i]['hobbies'] = hobbies;
                }
            }
            for (let i = 0; i < userDetails.userFamilyBackgrounds.length; i++) {
                let country = await this.masterService.getCountry(userDetails.userFamilyBackgrounds[i].country);
                let state = await this.masterService.getState(userDetails.userFamilyBackgrounds[i].state);
                let city = await this.masterService.getCity(userDetails.userFamilyBackgrounds[i].city);
                if (country && country['name']) {
                    userDetails.userFamilyBackgrounds[i]['countryName'] = country['name'];
                }
                if (state && state['name']) {
                    userDetails.userFamilyBackgrounds[i]['stateName'] = state['name'];
                }
                if (city && city['name']) {
                    userDetails.userFamilyBackgrounds[i]['cityName'] = city['name'];
                }
            }
            let requiredData = {};
            if (myBasicId) {
                console.log('userReqDet', userReqDet);
                let uniqueUsers = [userDetails];
                const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(myBasicId);
                console.log('connectUsers', connectUsers);
                let tempObj = {
                    isLiked: false,
                    sent: false,
                    requested: false,
                    isConnected: false,
                    id: '',
                };
                let requiredObj = {};
                let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == userDetails.id);
                console.log('isConnectOne', isConnectOne);
                if (isConnectOne != null) {
                    (tempObj.isLiked = true),
                        (tempObj.requested = true),
                        (tempObj.isConnected =
                            isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                ? true
                                : false);
                    tempObj.id = isConnectOne.id;
                    requiredObj = isConnectOne;
                    userDetails['UserRequestStatus'] = isConnectOne ? [isConnectOne] : [];
                }
                let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == userDetails.id);
                console.log('isConnectTwo', isConnectTwo);
                if (isConnectTwo != null) {
                    (tempObj.isLiked = true),
                        (tempObj.sent = true),
                        (tempObj.isConnected =
                            isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                ? true
                                : false);
                    tempObj.id = isConnectTwo.id;
                    requiredObj = isConnectTwo;
                    userDetails['UserRequestStatus'] = isConnectTwo ? [isConnectTwo] : [];
                }
                userDetails['interestStatus'] = tempObj;
                uniqueUsers.forEach((uu) => { });
                const connectedUserForCallAndMessage = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
                uniqueUsers.forEach((uu) => {
                    let tempObj = {
                        isConnected: false,
                        id: null,
                    };
                    let isConnectOne = connectedUserForCallAndMessage.find((u) => u.userOneBasicId == uu.id);
                    if (isConnectOne != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                    }
                    let isConnectTwo = connectedUserForCallAndMessage.find((u) => u.userTwoBasicId == uu.id);
                    if (isConnectTwo != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                    }
                    uu['connectStatus'] = tempObj;
                });
                const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(myBasicId);
                uniqueUsers.forEach((uu) => {
                    let tempObj = {
                        isConnectedForCallMessage: false,
                        userConnectRequestId: null,
                    };
                    let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
                    if (isConnectOne != null) {
                        (tempObj.isConnectedForCallMessage = true),
                            (tempObj.userConnectRequestId = isConnectOne.id);
                    }
                    let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
                    if (isConnectTwo) {
                        (tempObj.isConnectedForCallMessage = true),
                            (tempObj.userConnectRequestId = isConnectTwo.id);
                    }
                    uu['connectRequestCallMessageStatus'] = tempObj;
                });
                console.log('uniqueUsers', uniqueUsers);
            }
            console.log('userDetails', userDetails);
            return Object.assign(Object.assign({}, userDetails), { blockStatus: blockStatus, blockDetails: blockDetails });
        }
        catch (err) {
            console.log('ERRRRRROR', err);
        }
    }
    async getUserDeatailByDisplayId(displayId, myBasicId) {
        try {
            const entityManager = typeorm_1.getManager();
            const rawQuery = `SELECT id from user_basics where displayId='${displayId}'`;
            const userDet = await entityManager.query(rawQuery);
            console.log('USERDET', userDet);
            if (userDet.length == 0) {
                return undefined;
            }
            const userDetails = await this.userService.getAllUserDetailsById(userDet[0].id);
            userDetails.userCareers = userDetails.userCareers.filter((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Current ||
                x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
            userDetails.userFamilyBackgrounds =
                userDetails.userFamilyBackgrounds.filter((x) => x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Current ||
                    x.profileUpdationStatus == miscellaneous_enum_1.ProfileUpdationStatus.Pending);
            for (let i = 0; i < userDetails.userCareers.length; i++) {
                let country = await this.masterService.getCountry(userDetails.userCareers[i].country);
                let state = await this.masterService.getState(userDetails.userCareers[i].state);
                let city = await this.masterService.getCity(userDetails.userCareers[i].city);
                userDetails.userCareers[i]['countryName'] = country['name'];
                userDetails.userCareers[i]['stateName'] = state['name'];
                userDetails.userCareers[i]['cityName'] = city['name'];
            }
            for (let i = 0; i < userDetails.userFamilyBackgrounds.length; i++) {
                let country = await this.masterService.getCountry(userDetails.userFamilyBackgrounds[i].country);
                let state = await this.masterService.getState(userDetails.userFamilyBackgrounds[i].state);
                let city = await this.masterService.getCity(userDetails.userFamilyBackgrounds[i].city);
                userDetails.userFamilyBackgrounds[i]['countryName'] = country['name'];
                userDetails.userFamilyBackgrounds[i]['stateName'] = state['name'];
                userDetails.userFamilyBackgrounds[i]['cityName'] = city['name'];
            }
            let requiredData = {};
            let userReqDet = [];
            let requiredObj = {};
            if (myBasicId) {
                console.log('userReqDet', userReqDet);
                let uniqueUsers = [userDetails];
                const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(myBasicId);
                console.log('connectUsers', connectUsers);
                let tempObj = {
                    isLiked: false,
                    sent: false,
                    requested: false,
                    isConnected: false,
                    id: '',
                };
                let requiredObj = {};
                let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == userDetails.id);
                console.log('isConnectOne', isConnectOne);
                if (isConnectOne != null) {
                    (tempObj.isLiked = true),
                        (tempObj.requested = true),
                        (tempObj.isConnected =
                            isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                ? true
                                : false);
                    tempObj.id = isConnectOne.id;
                    requiredObj = isConnectOne;
                    userDetails['UserRequestStatus'] = isConnectOne ? [isConnectOne] : [];
                }
                let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == userDetails.id);
                console.log('isConnectTwo', isConnectTwo);
                if (isConnectTwo != null) {
                    (tempObj.isLiked = true),
                        (tempObj.sent = true),
                        (tempObj.isConnected =
                            isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                                ? true
                                : false);
                    tempObj.id = isConnectTwo.id;
                    requiredObj = isConnectTwo;
                    userDetails['UserRequestStatus'] = isConnectTwo ? [isConnectTwo] : [];
                }
                userDetails['interestStatus'] = tempObj;
                uniqueUsers.forEach((uu) => {
                    console.log(isConnectOne);
                });
                const connectedUserForCallAndMessage = await this.connectService.getUserConnectRequestsByUserId(myBasicId);
                uniqueUsers.forEach((uu) => {
                    let tempObj = {
                        isConnected: false,
                        id: null,
                    };
                    let isConnectOne = connectedUserForCallAndMessage.find((u) => u.userOneBasicId == uu.id);
                    if (isConnectOne != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                    }
                    let isConnectTwo = connectedUserForCallAndMessage.find((u) => u.userTwoBasicId == uu.id);
                    if (isConnectTwo != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                    }
                    uu['connectStatus'] = tempObj;
                });
                const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(myBasicId);
                uniqueUsers.forEach((uu) => {
                    let tempObj = {
                        isConnectedForCallMessage: false,
                        userConnectRequestId: null,
                    };
                    let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
                    if (isConnectOne != null) {
                        (tempObj.isConnectedForCallMessage = true),
                            (tempObj.userConnectRequestId = isConnectOne.id);
                    }
                    let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
                    if (isConnectTwo != null) {
                        (tempObj.isConnectedForCallMessage = true),
                            (tempObj.userConnectRequestId = isConnectOne.id);
                    }
                    uu['connectRequestCallMessageStatus'] = tempObj;
                });
                console.log('uniqueUsers324324324', uniqueUsers);
            }
            console.log('userDetails', userDetails);
            if (userReqDet.length > 0) {
                requiredData = Object.assign({}, userDetails);
            }
            else {
                requiredData = Object.assign({}, userDetails);
            }
            return requiredData;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async getAppUsersForAdmin(filterObj) {
        let queryString = `SELECT uv.id,
    uv.displayId,
    uv.name,
    uv.phoneNumber,
    uv.email,
    uv.gender,
    uv.createdAt,
    uv.lifecycleStatus,
    uv.religion,
    uv.cast,
    uv.gothra,
    uv.relationship,
    uv.careerCity,
    uv.motherTongue,
    uv.careerState,
    uv.careerCountry,
    uv.activationStatus
    FROM users_view_admin uv 
    JOIN user_logins as ul 
    ON uv.id = ul.userBasicId
    WHERE uv.isActive = true `;
        if (filterObj['gender'] != undefined) {
            queryString = queryString + ` AND uv.gender = ${filterObj['gender']}`;
        }
        if (filterObj['profileStatus'] != undefined) {
            if (filterObj['profileStatus'] == 3) {
                queryString = queryString + ` AND uv.registrationStep < 8`;
            }
            if (filterObj['profileStatus'] == 2) {
                queryString =
                    queryString +
                        ` AND uv.registrationStep > 8 AND ul.updatedAt< DATE_SUB(NOW(), INTERVAL 60 DAY)`;
            }
        }
        if (!filterObj['profileStatus']) {
            queryString = queryString + ` AND uv.registrationStep > 8`;
        }
        if (filterObj['displayId'] != undefined) {
            if (filterObj['displayId'].includes('@')) {
                queryString =
                    queryString + ` AND uv.email = '${filterObj['displayId']}'`;
            }
            else if (/^\d+$/.test(filterObj['displayId'])) {
                queryString =
                    queryString + ` AND uv.phoneNumber = '${filterObj['displayId']}'`;
            }
            else {
                queryString =
                    queryString + ` AND uv.displayId = '${filterObj['displayId']}'`;
            }
        }
        if (filterObj['cast'] != undefined) {
            queryString = queryString + ` AND uv.cast = '${filterObj['cast']}'`;
        }
        if (filterObj['religion'] != undefined) {
            queryString =
                queryString + ` AND uv.religion = '${filterObj['religion']}'`;
        }
        if (filterObj['location'] != undefined) {
            queryString =
                queryString + ` AND uv.careerCity = '${filterObj['location']}'`;
        }
        if (filterObj['state'] != undefined) {
            queryString =
                queryString + ` AND uv.careerState = '${filterObj['state']}'`;
        }
        if (filterObj['country'] != undefined) {
            queryString =
                queryString + ` AND uv.careerCountry = '${filterObj['country']}'`;
        }
        if (filterObj['relationship'] != undefined) {
            queryString =
                queryString + ` AND uv.relationship = ${filterObj['relationship']}`;
        }
        if (filterObj['startDate'] != undefined &&
            filterObj['endDate'] != undefined) {
            queryString =
                queryString +
                    ` AND date(uv.createdAt) >= date('${filterObj['startDate']}') AND date(uv.createdAt) <= date('${filterObj['endDate']}') `;
        }
        if (filterObj['isVerified'] != undefined) {
            let isVerified = +filterObj['isVerified'];
            queryString = queryString + ` AND uv.activationStatus = ${isVerified}`;
        }
        if (filterObj['motherTongue'] != undefined) {
            queryString =
                queryString + ` AND uv.motherTongue = '${filterObj['motherTongue']}'`;
        }
        if (filterObj['limit'] == undefined) {
            filterObj['limit'] = 1000;
        }
        if (filterObj['offset'] == undefined) {
            filterObj['offset'] = 0;
        }
        queryString =
            queryString +
                ` ORDER BY uv.createdAt DESC LIMIT ${filterObj['limit']} OFFSET ${filterObj['offset']};`;
        console.log(queryString);
        let result = {
            users: [],
            count: 0,
            lastSearchedIds: [],
        };
        let res = await this.userService.getAppUsersForAdmin(queryString);
        let serachedResults = JSON.parse(fs.readFileSync(app_root.resolve('src/shared/searches/searched_displayids.json')));
        if (filterObj['displayId'] != undefined) {
            if (res.length > 0) {
                const newSearchedRecord = {
                    userId: res[0].id,
                    displayId: res[0].displayId,
                };
                let found = serachedResults.find((x) => x.displayId == newSearchedRecord.displayId);
                if (found == null) {
                    serachedResults = await this.updateSearchedResults(serachedResults, newSearchedRecord);
                }
            }
        }
        let uniqueUsers = [];
        res.forEach((r) => {
            let dup = uniqueUsers.find((re) => re.id == r.id);
            if (_.isEmpty(dup)) {
                uniqueUsers.push(r);
            }
        });
        result.users = uniqueUsers;
        result.count = uniqueUsers.length;
        result.lastSearchedIds = serachedResults;
        console.log('********', serachedResults);
        return result;
    }
    async updateSearchedResults(data, newSearchedRecord) {
        if (data.length > 10) {
            data.pop();
        }
        data.push(newSearchedRecord);
        fs.writeFileSync(app_root.resolve('src/shared/searches/searched_displayids.json'), JSON.stringify(data));
        return data;
    }
    async validateEmail(email) {
        let obj = {
            isEmailAvailable: true,
        };
        const user = await this.userService.getUserBasicByEmail(email);
        if (!_.isEmpty(user))
            obj.isEmailAvailable = false;
        return obj;
    }
    async getMatchPercentage(userBasicId, otherUserBasicId) {
        return this.userService.getMatchPercentage(userBasicId, otherUserBasicId);
    }
    async visistedProfile(visitedBy, visitedTo) {
        if (!visitedBy) {
            return 'Visited By Id is Missing';
        }
        if (!visitedTo) {
            return 'Visited To Id is Missing';
        }
        return this.userService.visitedProfile(visitedBy, visitedTo);
    }
    async recentProfileViews(userBasicId) {
        let result = await this.userService.recentProfileViews(userBasicId);
        let uniqueUsers = [];
        result.forEach((r) => {
            let dup = uniqueUsers.find((re) => re.id == r.id);
            if (_.isEmpty(dup)) {
                uniqueUsers.push(r);
            }
        });
        const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
        console.log('connectUsers', connectUsers);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isLiked: false,
                sent: false,
                requested: false,
                isConnected: false,
                id: '',
            };
            let requiredObj = {};
            let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isLiked = true),
                    (tempObj.requested = true),
                    (tempObj.isConnected =
                        isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectOne.id;
                requiredObj = isConnectOne;
            }
            let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isLiked = true),
                    (tempObj.sent = true),
                    (tempObj.isConnected =
                        isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectTwo.id;
                requiredObj = isConnectTwo;
            }
            uu['interestStatus'] = tempObj;
            uu['UserRequestStatus'] = requiredObj;
        });
        const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isConnected: false,
                id: null,
            };
            let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
            }
            let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
            }
            uu['connectStatus'] = tempObj;
        });
        return uniqueUsers;
    }
    async getProifleVisitedBy(userBasicId) {
        let result = await this.userService.getProifleVisitedBy(userBasicId);
        let uniqueUsers = [];
        result.forEach((r) => {
            let dup = uniqueUsers.find((re) => re.id == r.id);
            if (_.isEmpty(dup)) {
                uniqueUsers.push(r);
            }
        });
        const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
        console.log('connectUsers', connectUsers);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isLiked: false,
                sent: false,
                requested: false,
                isConnected: false,
                id: '',
            };
            let requiredObj = {};
            let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isLiked = true),
                    (tempObj.requested = true),
                    (tempObj.isConnected =
                        isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectOne.id;
                requiredObj = isConnectOne;
            }
            let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isLiked = true),
                    (tempObj.sent = true),
                    (tempObj.isConnected =
                        isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectTwo.id;
                requiredObj = isConnectTwo;
            }
            uu['interestStatus'] = tempObj;
            uu['UserRequestStatus'] = requiredObj;
        });
        const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isConnected: false,
                id: null,
            };
            let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
            }
            let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
            }
            uu['connectStatus'] = tempObj;
        });
        return uniqueUsers;
    }
    async getOnlineMembers(userBasicId, onlineUserIds) {
        return this.userService.getOnlineMembers(userBasicId, onlineUserIds);
    }
    async getPremiumMembers(userBasicId) {
        const result = await this.userService.getPremiumMembers(userBasicId);
        console.log('result', result);
        let uniqueUsers = [];
        result.forEach((r) => {
            let dup = uniqueUsers.find((re) => re.id == r.id);
            if (_.isEmpty(dup)) {
                uniqueUsers.push(r);
            }
        });
        const connectUsers = await this.connectService.getUserRequestStatusForAppPrefAndFilter(userBasicId);
        console.log('connectUsers', connectUsers);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isLiked: false,
                sent: false,
                requested: false,
                isConnected: false,
                id: '',
            };
            let requiredObj = {};
            let isConnectOne = connectUsers.find((u) => u.requestedUserBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isLiked = true),
                    (tempObj.requested = true),
                    (tempObj.isConnected =
                        isConnectOne.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectOne.id;
                requiredObj = isConnectOne;
            }
            let isConnectTwo = connectUsers.find((u) => u.requestingUserBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isLiked = true),
                    (tempObj.sent = true),
                    (tempObj.isConnected =
                        isConnectTwo.userRequestState == miscellaneous_enum_1.UserRequestState.Active
                            ? true
                            : false);
                tempObj.id = isConnectTwo.id;
                requiredObj = isConnectTwo;
            }
            uu['interestStatus'] = tempObj;
            uu['UserRequestStatus'] = requiredObj;
        });
        const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
        uniqueUsers.forEach((uu) => {
            let tempObj = {
                isConnected: false,
                id: null,
            };
            let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == uu.id);
            if (isConnectOne != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
            }
            let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == uu.id);
            if (isConnectTwo != null) {
                (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
            }
            uu['connectStatus'] = tempObj;
        });
        return uniqueUsers;
    }
    async blockProfile(block_who, block_whom) {
        const ucl = block_user_entity_1.UserBlock.createUserBlock(block_who, block_whom);
        return await this.userService.blockProfile(ucl);
    }
    async unBlockUser(id) {
        return await this.userService.unBlockUser(id);
    }
    async getBlockedUsers(id) {
        let listOfBLockedUsers = await this.userService.getBlockedUsers(id);
        let userList = [];
        let user;
        let generatedResponse = [];
        await Promise.all(listOfBLockedUsers.map(async (elem, i) => {
            try {
                let insertResponse = await this.getUserDeatailById(elem.block_whom, '');
                listOfBLockedUsers[i]['block_user_details'] = insertResponse;
                generatedResponse.push(insertResponse);
            }
            catch (error) {
                console.log('error' + error);
            }
        }));
        return await listOfBLockedUsers;
    }
    async getBlockedUsersForAll(id) {
        return await this.userService.getBlockedUsersForAll(id);
    }
};
UserFacade = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        master_service_1.MasterService,
        s3_service_1.S3Service,
        connect_service_1.ConnectService])
], UserFacade);
exports.UserFacade = UserFacade;
//# sourceMappingURL=user.facade.js.map