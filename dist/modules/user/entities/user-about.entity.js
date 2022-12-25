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
var UserAbout_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAbout = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let UserAbout = UserAbout_1 = class UserAbout extends abstract_entity_1.AbstarctEntity {
    static createUserAbout(name, dateOfBirth, maritalStatus, childrenStatus, abilityStatus, height, userBasic, numberOfChildren) {
        const userAbout = new UserAbout_1();
        userAbout.name = name;
        userAbout.dateOfBirth = dateOfBirth;
        userAbout.maritalStatus = maritalStatus;
        userAbout.childrenStatus = childrenStatus;
        userAbout.abilityStatus = abilityStatus;
        userAbout.height = height;
        userAbout.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Pending;
        userAbout.userBasic = userBasic;
        userAbout.numberOfChildren = numberOfChildren;
        return userAbout;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserAbout.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserAbout.prototype, "dateOfBirth", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserAbout.prototype, "fireBaseToken", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserAbout.prototype, "maritalStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserAbout.prototype, "childrenStatus", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserAbout.prototype, "numberOfChildren", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserAbout.prototype, "abilityStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserAbout.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.Column('decimal'),
    __metadata("design:type", Number)
], UserAbout.prototype, "height", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userAbouts),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserAbout.prototype, "userBasic", void 0);
UserAbout = UserAbout_1 = __decorate([
    typeorm_1.Entity('user_abouts')
], UserAbout);
exports.UserAbout = UserAbout;
//# sourceMappingURL=user-about.entity.js.map