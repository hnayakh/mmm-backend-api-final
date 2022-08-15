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
var UserLogin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
const user_basic_entity_1 = require("./user-basic.entity");
let UserLogin = UserLogin_1 = class UserLogin extends abstract_entity_1.AbstarctEntity {
    static createUserLoginRecord(deviceType, deviceId, authToken, userBasic) {
        const userLogin = new UserLogin_1();
        userLogin.deviceType = 'Mobile';
        userLogin.deviceId = 'xioakieq8734jd';
        userLogin.authToken = authToken;
        userLogin.userBasic = userBasic;
        return userLogin;
    }
    deactivate() {
        this.isActive = false;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserLogin.prototype, "deviceType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserLogin.prototype, "deviceId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserLogin.prototype, "authToken", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userLogins),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserLogin.prototype, "userBasic", void 0);
UserLogin = UserLogin_1 = __decorate([
    typeorm_1.Entity('user_logins')
], UserLogin);
exports.UserLogin = UserLogin;
//# sourceMappingURL=user-login.entity.js.map