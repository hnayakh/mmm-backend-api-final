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
var UserLifestyle_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLifestyle = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let UserLifestyle = UserLifestyle_1 = class UserLifestyle extends abstract_entity_1.AbstarctEntity {
    static createUserLifestyle(lifestyle, userBasic) {
        const userLifestyle = new UserLifestyle_1();
        userLifestyle.lifestyle = lifestyle;
        userLifestyle.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Pending;
        userLifestyle.userBasic = userBasic;
        return userLifestyle;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserLifestyle.prototype, "lifestyle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserLifestyle.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userLifestyle),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserLifestyle.prototype, "userBasic", void 0);
UserLifestyle = UserLifestyle_1 = __decorate([
    typeorm_1.Entity('user_lifestyle')
], UserLifestyle);
exports.UserLifestyle = UserLifestyle;
//# sourceMappingURL=user-lifestyle.entity.js.map