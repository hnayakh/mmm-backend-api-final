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
var UserCareer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCareer = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let UserCareer = UserCareer_1 = class UserCareer extends abstract_entity_1.AbstarctEntity {
    static createUserCareer(employedIn, occupation, annualIncome, highestEducation, country, state, city, userBasic) {
        const userCareer = new UserCareer_1();
        userCareer.employedIn = employedIn;
        userCareer.occupation = occupation;
        userCareer.annualIncome = annualIncome;
        userCareer.highestEducation = highestEducation;
        userCareer.country = country;
        userCareer.state = state;
        userCareer.city = city;
        userCareer.userBasic = userBasic;
        userCareer.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Pending;
        return userCareer;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserCareer.prototype, "employedIn", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserCareer.prototype, "occupation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserCareer.prototype, "annualIncome", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserCareer.prototype, "highestEducation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserCareer.prototype, "country", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserCareer.prototype, "state", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserCareer.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserCareer.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userCareers),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserCareer.prototype, "userBasic", void 0);
UserCareer = UserCareer_1 = __decorate([
    typeorm_1.Entity('user_careers')
], UserCareer);
exports.UserCareer = UserCareer;
//# sourceMappingURL=user-career.entity.js.map