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
var AdminUser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
const bcrypt = require("bcrypt");
let AdminUser = AdminUser_1 = class AdminUser extends abstract_entity_1.AbstarctEntity {
    async hashPassword() {
        this.password = await bcrypt.hash(this.password == null ? 'User@123' : this.password, 8);
    }
    static createAdminUser(firstName, lastName, email, gender, phoneNumber, password, role) {
        const adminUser = new AdminUser_1();
        adminUser.firstName = firstName;
        adminUser.lastName = lastName;
        adminUser.email = email;
        adminUser.gender = gender;
        adminUser.phoneNumber = phoneNumber;
        adminUser.password = password;
        adminUser.role = role;
        return adminUser;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AdminUser.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AdminUser.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AdminUser.prototype, "role", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminUser.prototype, "hashPassword", null);
AdminUser = AdminUser_1 = __decorate([
    typeorm_1.Entity('admin_users')
], AdminUser);
exports.AdminUser = AdminUser;
//# sourceMappingURL=admin-user.entity.js.map