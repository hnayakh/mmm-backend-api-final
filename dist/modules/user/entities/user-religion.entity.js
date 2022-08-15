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
var UserReligion_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReligion = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let UserReligion = UserReligion_1 = class UserReligion extends abstract_entity_1.AbstarctEntity {
    static createUserReligion(religion, cast, gothra, motherTongue, isManglik, userBasic) {
        const userReligion = new UserReligion_1();
        userReligion.religion = religion;
        userReligion.cast = cast;
        userReligion.gothra = gothra;
        userReligion.motherTongue = motherTongue;
        userReligion.isManglik = isManglik;
        userReligion.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Pending;
        userReligion.userBasic = userBasic;
        return userReligion;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserReligion.prototype, "religion", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserReligion.prototype, "cast", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserReligion.prototype, "gothra", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserReligion.prototype, "motherTongue", void 0);
__decorate([
    typeorm_1.Column({ default: user_profile_enum_1.Manglik.No }),
    __metadata("design:type", Number)
], UserReligion.prototype, "isManglik", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserReligion.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userReligions),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserReligion.prototype, "userBasic", void 0);
UserReligion = UserReligion_1 = __decorate([
    typeorm_1.Entity('user_religions')
], UserReligion);
exports.UserReligion = UserReligion;
//# sourceMappingURL=user-religion.entity.js.map