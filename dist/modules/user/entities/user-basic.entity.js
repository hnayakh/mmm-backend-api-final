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
var UserBasic_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBasic = void 0;
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
const user_bio_entity_1 = require("./user-bio.entity");
const user_about_entity_1 = require("./user-about.entity");
const user_habit_entity_1 = require("./user-habit.entity");
const user_religion_entity_1 = require("./user-religion.entity");
const user_career_entity_1 = require("./user-career.entity");
const user_family_background_entity_1 = require("./user-family-background.entity");
const user_family_detail_entity_1 = require("./user-family-detail.entity");
const user_image_entity_1 = require("./user-image.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_login_entity_1 = require("./user-login.entity");
const user_preference_entity_1 = require("./user-preference.entity");
const user_connect_entity_1 = require("../../connect/entities/user-connect.entity");
const recharge_history_entity_1 = require("../../connect/entities/recharge-history.entity");
const user_connect_log_entity_1 = require("../../connect/entities/user-connect-log.entity");
const user_profile_visit_1 = require("./user.profile.visit");
const connect_transaction_entity_1 = require("../../connect/entities/connect-transaction-entity");
const user_docs_entity_1 = require("./user-docs.entity");
const nanoid_1 = require("nanoid");
const user_lifestyle_entity_1 = require("./user-lifestyle.entity");
const user_hobbies_entity_1 = require("./user-hobbies.entity");
let UserBasic = UserBasic_1 = class UserBasic extends abstract_entity_1.AbstarctEntity {
    async hashPassword() {
        this.password = await bcrypt.hash(this.password == null ? 'User@123' : this.password, 8);
    }
    static createUserBasic(email, gender, countryCode, phoneNumber, password, relationship, accountType, providerId, fireBaseToken) {
        if (accountType) {
            accountType = user_profile_enum_1.AccountType.Email;
        }
        const userBasic = new UserBasic_1();
        userBasic.email = email;
        userBasic.gender = gender;
        userBasic.countryCode = countryCode;
        userBasic.phoneNumber = phoneNumber;
        userBasic.password = password;
        userBasic.accountType = accountType;
        userBasic.socialProviderId = providerId;
        userBasic.fireBaseToken = fireBaseToken;
        userBasic.activationStatus = miscellaneous_enum_1.ActivationStatus.Pending;
        userBasic.lifecycleStatus = miscellaneous_enum_1.LifecycleStatus.Active;
        userBasic.registrationStep = miscellaneous_enum_1.RegistrationSteps.About;
        userBasic.relationship = relationship;
        userBasic.displayId = 'MM' + nanoid_1.nanoid(6);
        console.log("NANOID", userBasic.displayId);
        return userBasic;
    }
    updateRegistrationStep(registrationStep) {
        this.registrationStep = registrationStep;
        return this;
    }
    updateStatus(activationStatus, registrationSteps) {
        this.activationStatus = activationStatus;
        this.registrationStep = registrationSteps;
        return this;
    }
};
__decorate([
    typeorm_1.Column({ default: user_profile_enum_1.Relationship.Self }),
    __metadata("design:type", Number)
], UserBasic.prototype, "relationship", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UserBasic.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserBasic.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserBasic.prototype, "countryCode", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UserBasic.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserBasic.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserBasic.prototype, "accountType", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], UserBasic.prototype, "isEmailVerified", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserBasic.prototype, "socialProviderId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserBasic.prototype, "displayId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserBasic.prototype, "activationStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserBasic.prototype, "lifecycleStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserBasic.prototype, "fireBaseToken", void 0);
__decorate([
    typeorm_1.Column({ default: miscellaneous_enum_1.RegistrationSteps.Basic }),
    __metadata("design:type", Number)
], UserBasic.prototype, "registrationStep", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_bio_entity_1.UserBio, (userBios) => userBios.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userBios", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_about_entity_1.UserAbout, (userAbouts) => userAbouts.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userAbouts", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_habit_entity_1.UserHabit, (userHabits) => userHabits.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userHabits", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_lifestyle_entity_1.UserLifestyle, (userLifestyle) => userLifestyle.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userLifestyle", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_hobbies_entity_1.UserHobbies, (userHobbies) => userHobbies.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userHobbies", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_religion_entity_1.UserReligion, (userReligions) => userReligions.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userReligions", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_profile_visit_1.ProfileVisit, (visit) => visit.visitedById),
    __metadata("design:type", Array)
], UserBasic.prototype, "visitedById", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_profile_visit_1.ProfileVisit, (visit) => visit.visitedToId),
    __metadata("design:type", Array)
], UserBasic.prototype, "visitedToId", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_career_entity_1.UserCareer, (userCareers) => userCareers.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userCareers", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_family_background_entity_1.UserFamilyBackground, (userFamilyBackgrounds) => userFamilyBackgrounds.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userFamilyBackgrounds", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_family_detail_entity_1.UserFamilyDetail, (userFamilyDetails) => userFamilyDetails.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userFamilyDetails", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_image_entity_1.UserImage, (userImages) => userImages.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userImages", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_docs_entity_1.UserDocs, (UserDocs) => UserDocs.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userDocs", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_connect_entity_1.UserConnect, (userConnects) => userConnects.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userConnects", void 0);
__decorate([
    typeorm_1.OneToMany((type) => connect_transaction_entity_1.ConnectTransactionEntity, (connectTransaction) => connectTransaction.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "connectTransaction", void 0);
__decorate([
    typeorm_1.OneToMany((type) => recharge_history_entity_1.RechargeHistory, (rechargeHistory) => rechargeHistory.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "rechargeHistory", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_connect_log_entity_1.UserConnectLog, (userConnectLogs) => userConnectLogs.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userConnectLogs", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_preference_entity_1.UserPreference, (userImages) => userImages.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userPreferences", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_login_entity_1.UserLogin, (userLogins) => userLogins.userBasic),
    __metadata("design:type", Array)
], UserBasic.prototype, "userLogins", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserBasic.prototype, "hashPassword", null);
UserBasic = UserBasic_1 = __decorate([
    typeorm_1.Entity('user_basics')
], UserBasic);
exports.UserBasic = UserBasic;
//# sourceMappingURL=user-basic.entity.js.map