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
var UserFamilyDetail_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFamilyDetail = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let UserFamilyDetail = UserFamilyDetail_1 = class UserFamilyDetail extends abstract_entity_1.AbstarctEntity {
    static createUserFamilyDetail(fatherOccupation, motherOccupation, numberOfBrothers, marriedNumberOfBrothers, numberOfSisters, marriedNumberOfSisters, userBasic) {
        const ufd = new UserFamilyDetail_1();
        ufd.fatherOccupation = fatherOccupation;
        ufd.motherOccupation = motherOccupation;
        ufd.numberOfBrothers = numberOfBrothers;
        ufd.marriedNumberOfBrothers = marriedNumberOfBrothers;
        ufd.numberOfSisters = numberOfSisters;
        ufd.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Pending;
        ufd.userBasic = userBasic;
        ufd.marriedNumberOfSisters = marriedNumberOfSisters;
        return ufd;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column({ default: user_profile_enum_1.FatherOccupation.Business }),
    __metadata("design:type", Number)
], UserFamilyDetail.prototype, "fatherOccupation", void 0);
__decorate([
    typeorm_1.Column({ default: user_profile_enum_1.MotherOccupation.HomeMaker }),
    __metadata("design:type", Number)
], UserFamilyDetail.prototype, "motherOccupation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyDetail.prototype, "numberOfBrothers", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyDetail.prototype, "marriedNumberOfBrothers", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyDetail.prototype, "numberOfSisters", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyDetail.prototype, "marriedNumberOfSisters", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserFamilyDetail.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userFamilyDetails),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserFamilyDetail.prototype, "userBasic", void 0);
UserFamilyDetail = UserFamilyDetail_1 = __decorate([
    typeorm_1.Entity('user_family_details')
], UserFamilyDetail);
exports.UserFamilyDetail = UserFamilyDetail;
//# sourceMappingURL=user-family-detail.entity.js.map