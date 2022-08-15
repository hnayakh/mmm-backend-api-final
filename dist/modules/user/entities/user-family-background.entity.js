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
var UserFamilyBackground_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFamilyBackground = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let UserFamilyBackground = UserFamilyBackground_1 = class UserFamilyBackground extends abstract_entity_1.AbstarctEntity {
    static createUserFamilyBackground(familyStatus, familyValues, familyType, country, state, city, userBasic) {
        const ufb = new UserFamilyBackground_1();
        ufb.familyStatus = familyStatus;
        ufb.familyValues = familyValues;
        ufb.familyType = familyType;
        ufb.country = country;
        ufb.state = state;
        ufb.city = city;
        ufb.userBasic = userBasic;
        ufb.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Pending;
        return ufb;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column({ default: user_profile_enum_1.FamilyAfluenceLevel.MiddleClass }),
    __metadata("design:type", Number)
], UserFamilyBackground.prototype, "familyStatus", void 0);
__decorate([
    typeorm_1.Column({ default: user_profile_enum_1.FamilyValues.Moderate }),
    __metadata("design:type", Number)
], UserFamilyBackground.prototype, "familyValues", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyBackground.prototype, "familyType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyBackground.prototype, "country", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyBackground.prototype, "state", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyBackground.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyBackground.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userFamilyBackgrounds),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserFamilyBackground.prototype, "userBasic", void 0);
UserFamilyBackground = UserFamilyBackground_1 = __decorate([
    typeorm_1.Entity('user_family_backgrounds')
], UserFamilyBackground);
exports.UserFamilyBackground = UserFamilyBackground;
//# sourceMappingURL=user-family-background.entity.js.map