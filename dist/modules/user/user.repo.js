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
exports.UserRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
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
const user_profile_visit_1 = require("./entities/user.profile.visit");
let UserRepo = class UserRepo {
    constructor(jwtstategy, userBasicRepo, userAboutRepo, userHabitRepo, userReligionRepo, userCareerRepo, userFamilyBackgroundRepo, userFamilyDetailRepo, userImageRepo, userBioRepo, otpRepo, userLoginRepo, adminUserRepo, userPreferenceRepo, userProfileVisitRepo) {
        this.jwtstategy = jwtstategy;
        this.userBasicRepo = userBasicRepo;
        this.userAboutRepo = userAboutRepo;
        this.userHabitRepo = userHabitRepo;
        this.userReligionRepo = userReligionRepo;
        this.userCareerRepo = userCareerRepo;
        this.userFamilyBackgroundRepo = userFamilyBackgroundRepo;
        this.userFamilyDetailRepo = userFamilyDetailRepo;
        this.userImageRepo = userImageRepo;
        this.userBioRepo = userBioRepo;
        this.otpRepo = otpRepo;
        this.userLoginRepo = userLoginRepo;
        this.adminUserRepo = adminUserRepo;
        this.userPreferenceRepo = userPreferenceRepo;
        this.userProfileVisitRepo = userProfileVisitRepo;
    }
    async getAllUsers(skip, take) {
        return await this.userBasicRepo.find({
            relations: [
                'userBios',
                'userAbouts',
            ],
        });
    }
    async getUsersByIds(userBasicIds) {
        let tempQuery = `SELECT * FROM users_view_admin au WHERE au.id IN (`;
        userBasicIds.forEach((u) => {
            tempQuery += `'${u}',`;
        });
        let query = tempQuery.slice(0, -1);
        query += `);`;
        const entityManager = typeorm_2.getManager();
        const users = await entityManager.query(query);
        return users;
    }
    async createUserBasic(userBasic) {
        return await this.userBasicRepo.save(userBasic);
    }
    async updateUserBasic(userBasic) {
        return await this.userBasicRepo.save(Object.assign({}, userBasic));
    }
    async getUserBasicById(userBasicId) {
        return await this.userBasicRepo.findOne(userBasicId);
    }
    async createUserAbout(userAbout) {
        const existingPending = await this.userAboutRepo.findOne({
            where: {
                userBasic: userAbout.userBasic,
                profileUpdationStatus: miscellaneous_enum_1.ProfileUpdationStatus.Pending,
            },
        });
        if (existingPending != null) {
            existingPending.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Archived;
            this.userAboutRepo.save(Object.assign({}, existingPending));
        }
        return await this.userAboutRepo.save(userAbout);
    }
    async updateUserAbout(userAbout) {
        return await this.userAboutRepo.save(Object.assign({}, userAbout));
    }
    async createUserHabit(userHabit) {
        const existingPending = await this.userHabitRepo.findOne({
            where: {
                userBasic: userHabit.userBasic,
                profileUpdationStatus: miscellaneous_enum_1.ProfileUpdationStatus.Pending,
            },
        });
        if (existingPending != null) {
            existingPending.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Archived;
            this.userHabitRepo.save(Object.assign({}, existingPending));
        }
        return await this.userHabitRepo.save(userHabit);
    }
    async updateUserHabit(userHabit) {
        return await this.userHabitRepo.save(Object.assign({}, userHabit));
    }
    async createUserFamilyDetail(ufd) {
        const existingPending = await this.userFamilyDetailRepo.findOne({
            where: {
                userBasic: ufd.userBasic,
                profileUpdationStatus: miscellaneous_enum_1.ProfileUpdationStatus.Pending,
            },
        });
        if (existingPending != null) {
            existingPending.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Archived;
            this.userFamilyDetailRepo.save(Object.assign({}, existingPending));
        }
        return await this.userFamilyDetailRepo.save(ufd);
    }
    async updateUserFamilyDetail(ufd) {
        return await this.userFamilyDetailRepo.save(Object.assign({}, ufd));
    }
    async createUserFamilyBackground(ufbg) {
        const existingPending = await this.userFamilyBackgroundRepo.findOne({
            where: {
                userBasic: ufbg.userBasic,
                profileUpdationStatus: miscellaneous_enum_1.ProfileUpdationStatus.Pending,
            },
        });
        if (existingPending != null) {
            existingPending.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Archived;
            this.userFamilyBackgroundRepo.save(Object.assign({}, existingPending));
        }
        return await this.userFamilyBackgroundRepo.save(ufbg);
    }
    async updateUserFamilyBackground(ufbg) {
        return await this.userFamilyBackgroundRepo.save(Object.assign({}, ufbg));
    }
    async createUserCareer(userCareer) {
        const existingPending = await this.userCareerRepo.findOne({
            where: {
                userBasic: userCareer.userBasic,
                profileUpdationStatus: miscellaneous_enum_1.ProfileUpdationStatus.Pending,
            },
        });
        if (existingPending != null) {
            existingPending.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Archived;
            this.userCareerRepo.save(Object.assign({}, existingPending));
        }
        return await this.userCareerRepo.save(userCareer);
    }
    async updateUserCareer(userCareer) {
        return await this.userCareerRepo.save(Object.assign({}, userCareer));
    }
    async createUserReligion(userReligion) {
        const existingPending = await this.userReligionRepo.findOne({
            where: {
                userBasic: userReligion.userBasic,
                profileUpdationStatus: miscellaneous_enum_1.ProfileUpdationStatus.Pending,
            },
        });
        if (existingPending != null) {
            existingPending.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Archived;
            this.userReligionRepo.save(Object.assign({}, existingPending));
        }
        return await this.userReligionRepo.save(userReligion);
    }
    async updateUserReligion(userReligion) {
        return await this.userReligionRepo.save(Object.assign({}, userReligion));
    }
    async createUserBio(userBio) {
        const existingPending = await this.userBioRepo.findOne({
            where: {
                userBasic: userBio.userBasic,
                profileUpdationStatus: miscellaneous_enum_1.ProfileUpdationStatus.Pending,
            },
        });
        if (existingPending != null) {
            existingPending.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Archived;
            this.userBioRepo.save(Object.assign({}, existingPending));
        }
        return await this.userBioRepo.save(userBio);
    }
    async updateUserBio(userBio) {
        return await this.userBioRepo.save(Object.assign({}, userBio));
    }
    async createUserImages(userImages) {
        return await this.userImageRepo.save(userImages);
    }
    async updateUserImages(userImages) {
        return await this.userImageRepo.save(Object.assign({}, userImages));
    }
    async getUserBasicByEmail(email) {
        return await this.userBasicRepo.findOne({ where: { email: email } });
    }
    async getUserById(userBasicId) {
        return await this.userBasicRepo.findOne({
            where: {
                id: userBasicId,
            },
            relations: [
                'userBios',
                'userAbouts',
                'userHabits',
                'userReligions',
                'userCareers',
                'userFamilyBackgrounds',
                'userFamilyDetails',
                'userImages',
            ],
        });
    }
    async getUserBasicByPhone(phoneNumber) {
        const res = await this.userBasicRepo.findOne({
            where: { phoneNumber: phoneNumber },
        });
        return res;
    }
    async createUserLoginRecord(userLogin) {
        const userLoginObj = await this.userLoginRepo.findOne({
            where: {
                userBasic: userLogin.userBasic,
                isActive: true,
            },
        });
        if (userLoginObj) {
            userLoginObj.deactivate();
            this.userLoginRepo.save(Object.assign({}, userLoginObj));
        }
        else
            return await this.userLoginRepo.save(userLogin);
    }
    async createOtp(otpObj) {
        const otp = await this.otpRepo.findOne({
            where: {
                phoneNumber: otpObj.phoneNumber,
                isActive: true,
            },
        });
        if (otp) {
            otp.deactivate();
            this.otpRepo.save(Object.assign({}, otp));
        }
        return await this.otpRepo.save(otpObj);
    }
    async updateOtpStatus(otpObj) {
        return await this.otpRepo.save(Object.assign({}, otpObj));
    }
    async getOtpForVerification(phoneNumber, email) {
        if (phoneNumber != null) {
            const otp = await this.otpRepo.findOne({
                where: {
                    phoneNumber: phoneNumber,
                    isActive: true,
                },
            });
            return otp;
        }
        else {
            const otp = await this.otpRepo.findOne({
                where: {
                    email: email,
                    isActive: true,
                },
            });
            return otp;
        }
    }
    async getUserGenderById(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT id,
                      gender FROM user_basics ub
                      WHERE ub.id = '${userBasicId}';`;
        const user = await entityManager.query(rawQuery);
        return user[0].gender;
    }
    async getUserGenderAndPreference(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT up.userBasicId,
                      ub.gender,
                      up.minAge,
                      up.maxAge,
                      up.minHeight,
                      up.maxHeight,
                      up.maritalStatus,
                      up.country,
                      up.state,
                      up.city,
                      up.religion,
                      up.caste,
                      up.motherTongue,
                      up.highestEducation,
                      up.occupation,
                      up.dietaryHabits,
                      up.drinkingHabits,
                      up.smokingHabits,
                      up.challenged,
                      up.maxIncome,
                      up.minIncome,
                      ub.activationStatus
                      from user_basics ub
                      left join user_preferences up
                      on up.userBasicId = ub.id
                      WHERE up.userBasicId = '${userBasicId}'`;
        const users = await entityManager.query(rawQuery);
        return users[0];
    }
    async getAppUsersForAdmin(queryString) {
        const entityManager = typeorm_2.getManager();
        const users = await entityManager.query(queryString);
        return users;
    }
    async getProfilesByPreference(queryString) {
        const entityManager = typeorm_2.getManager();
        const profiles = await entityManager.query(queryString);
        return profiles;
    }
    async createAdminUser(adminUser) {
        return this.adminUserRepo.save(adminUser);
    }
    async getAdminUsers() {
        return this.adminUserRepo.find({
            where: {
                isActive: true,
            },
        });
    }
    async getAdminUserByEmail(email) {
        return this.adminUserRepo.findOne({
            where: {
                email: email,
            },
        });
    }
    async createUserPreference(userPreference) {
        return await this.userPreferenceRepo.save(userPreference);
    }
    async visitedProfile(visitedBy, visitedTo) {
        const profileVisit = user_profile_visit_1.ProfileVisit.createVisit(visitedBy, visitedTo);
        return await this.userProfileVisitRepo.save(profileVisit);
    }
    async getAllUserDetailsById(userBasicId) {
        return await this.userBasicRepo.findOne({
            where: {
                id: userBasicId,
            },
            relations: [
                'userBios',
                'userAbouts',
                'userHabits',
                'userReligions',
                'userCareers',
                'userFamilyBackgrounds',
                'userFamilyDetails',
                'userImages',
            ],
        });
    }
    async getRequiredLoginDetails(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT uv.relationship,
                      uv.name,
                      uv.dateOfBirth,
                      uv.height,
                      uv.maritalStatus,
                      uv.careerCountry,
                      uv.careerCountryId,
                      uv.religion,
                      uv.abilityStatus,
                      uv.motherTongue 
                      FROM users_view_admin uv
                      WHERE uv.id = '${userBasicId}';`;
        const userDet = await entityManager.query(rawQuery);
        const jwtToken = this.jwtstategy.sign({
            username: userDet.name,
            sub: userBasicId,
        });
        userDet.jwt = jwtToken;
        return userDet;
    }
    async getUserPreferenceByUserId(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `SELECT up.userBasicId, up.minAge, up.maxAge, up.minHeight, up.maxHeight, up.maritalStatus, up.country,
    s.name as state,ums.name as maritalStatus ,c.name as country,
    up.state,up.city, up.religion, up.caste, up.motherTongue, up.highestEducation, up.
    occupation, up.dietaryHabits, up.drinkingHabits, up.smokingHabits, up.challenged, up.maxIncome, up.minIncome  
    FROM user_preferences up
    inner join states s ON REGEXP_LIKE(up.state, s.id)
    inner join user_marital_status ums on REGEXP_LIKE(up.maritalStatus, ums.id)
    inner join  countries c ON REGEXP_LIKE(up.country, c.id)
    where up.userBasicId= '${userBasicId}'`;
        const userDet = await entityManager.query(rawQuery);
        console.log('userDet', userDet);
        let userPreferenc = new user_preference_entity_1.UserPreference();
        userDet.forEach((record) => {
            console.log('record', Object.keys(record));
            Object.keys(record).forEach((key) => {
                console.log('key', key);
                let recordValue = record[key].toString().indexOf('[') == 0
                    ? String(JSON.parse(record[key]))
                    : record[key];
                console.log('recordValue', recordValue);
                if (key != 'userBasicId' && userPreferenc[key] != recordValue) {
                    if (userPreferenc[key]) {
                        if (userPreferenc[key].length &&
                            userPreferenc[key].split(',').indexOf(recordValue) == -1) {
                            userPreferenc[key] = userPreferenc[key] + ',' + recordValue;
                        }
                    }
                    else {
                        userPreferenc[key] = recordValue;
                    }
                }
            });
        });
        console.log('userDet', userDet);
        return userPreferenc;
    }
    async getMatchPercentage(userBasicId, otherUserBasicId) {
        let matchingFields = [];
        let differentFields = [];
        let userDetails = await this.getAllUserDetailsById(userBasicId);
        let userPreference = await this.getUserPreferenceByUserId(userBasicId);
        let otherUserPreference = await this.getUserPreferenceByUserId(otherUserBasicId);
        console.log('userDetails', userDetails.userImages[0]);
        let excludedFields = [
            'createdAt',
            'updatedAt',
            'isActive',
            'createdBy',
            'updatedBy',
            'id',
        ];
        Object.keys(userPreference)
            .filter((x) => excludedFields.indexOf(x) == -1)
            .forEach((filed) => {
            if (userPreference[filed]) {
                if (userPreference[filed] === otherUserPreference[filed]) {
                    console.log('fdfdfddf', userPreference);
                    matchingFields.push({ filed, value: userPreference[filed] });
                }
                else {
                    differentFields.push({ filed, value: userPreference[filed] });
                }
            }
        });
        let match_percentage = ((matchingFields.length /
            (matchingFields.length + differentFields.length)) *
            100).toFixed(0);
        return {
            matchingFields: matchingFields,
            differentFields: differentFields,
            match_percentage: match_percentage,
            userImage: userDetails.userImages[0]
        };
    }
    async getRecentViews(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `select pv.id as userBasicId,
    uva.*,
    pv.updatedAt as visitedAt
    from profile_visit pv
     join users_view_admin uva on
    pv.visitedById = uva.id
    and pv.visitedToId = '${userBasicId}'
    and pv.updatedAt > NOW() - INTERVAL (select value  from settings where name = 'RecentProfileVisitDuratinThreshholdInDays' ) DAY
    group by pv.visitedById;`;
        const userDet = await entityManager.query(rawQuery);
        return userDet;
    }
    async getProifleVisitedBy(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `select pv.id as visitId,
    uva.*,
    pv.updatedAt as visitedAt
    from profile_visit pv
     join users_view_admin uva on
    pv.visitedToId = uva.id
    WHERE pv.isActive
    and pv.visitedById = '${userBasicId}'
    and pv.updatedAt > NOW() - INTERVAL (select value  from settings where name = 'RecentProfileVisitDuratinThreshholdInDays' ) DAY
    group by pv.visitedToId`;
        const userDet = await entityManager.query(rawQuery);
        return userDet;
    }
    async getOnlineMembers(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `select distinct(pv.id) as userBasicId, pv.*,
    pv.createdAt as visitedAt
    from users_view pv
    join users_view uv
    WHERE uv.id = '${userBasicId}'
    and pv.isActive = 1
    and pv.id != '${userBasicId}'
    and pv.gender != uv.gender
    group by pv.id
`;
        const userDet = await entityManager.query(rawQuery);
        console.log('requiredConnectionData', userDet);
        const userReligionQuery = `select religion  from user_preferences where userBasicId='${userBasicId}'`;
        let requiredReligionData = await entityManager.query(userReligionQuery);
        console.log('requiredReligionData', requiredReligionData);
        let userReligions = [].concat(...requiredReligionData
            .map((x) => JSON.parse(x.religion))
            .filter((y) => y != null));
        console.log('userReligions', userReligions);
        let result = userDet.filter((c) => c.religion && userReligions.some((r) => c.religion.indexOf(r) > -1));
        return result;
    }
    async getPremiumMembers(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `select  distinct(ucl.userBasicId), s.name as state,c.name as city, ui.imageURL,ua.name,ua.dateOfBirth,up.religion  from user_connect_logs ucl 
    join user_preferences up   on ucl.userBasicId =  up.userBasicId
    join user_images ui on ui.userBasicId = ucl.userBasicId
    join user_abouts ua on ua.userBasicId = ucl.userBasicId
    join user_family_backgrounds ufb on ufb.userBasicId = ucl.userBasicId
    join states s on s.id=ufb.state
    join cities c on c.id = ufb.city
     WHERE  ucl.updatedBy < NOW() - INTERVAL (select value  from settings where name = 'PremiumMemberConnectrequestMonthDuration' ) MONTH
     AND currentConnectBalance > (select value  from settings where name = 'PremiumMemberConnectBuyCountThreshhold' )
     group by ucl.userBasicId 
     ;`;
        const requiredConnectionData = await entityManager.query(rawQuery);
        console.log('requiredConnectionData', requiredConnectionData);
        const userReligionQuery = `select religion  from user_preferences where userBasicId='${userBasicId}'`;
        let requiredReligionData = await entityManager.query(userReligionQuery);
        console.log('requiredReligionData', requiredReligionData);
        let userReligions = [].concat(...requiredReligionData.map((x) => JSON.parse(x.religion)));
        console.log('userReligions', userReligions);
        let result = requiredConnectionData.filter((c) => userReligions.some((r) => c.religion.indexOf(r) > -1));
        console.log('result', result);
        return result;
    }
};
UserRepo = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(user_basic_entity_1.UserBasic)),
    __param(2, typeorm_1.InjectRepository(user_about_entity_1.UserAbout)),
    __param(3, typeorm_1.InjectRepository(user_habit_entity_1.UserHabit)),
    __param(4, typeorm_1.InjectRepository(user_religion_entity_1.UserReligion)),
    __param(5, typeorm_1.InjectRepository(user_career_entity_1.UserCareer)),
    __param(6, typeorm_1.InjectRepository(user_family_background_entity_1.UserFamilyBackground)),
    __param(7, typeorm_1.InjectRepository(user_family_detail_entity_1.UserFamilyDetail)),
    __param(8, typeorm_1.InjectRepository(user_image_entity_1.UserImage)),
    __param(9, typeorm_1.InjectRepository(user_bio_entity_1.UserBio)),
    __param(10, typeorm_1.InjectRepository(otp_entity_1.Otp)),
    __param(11, typeorm_1.InjectRepository(user_login_entity_1.UserLogin)),
    __param(12, typeorm_1.InjectRepository(admin_user_entity_1.AdminUser)),
    __param(13, typeorm_1.InjectRepository(user_preference_entity_1.UserPreference)),
    __param(14, typeorm_1.InjectRepository(user_profile_visit_1.ProfileVisit)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserRepo);
exports.UserRepo = UserRepo;
//# sourceMappingURL=user.repo.js.map