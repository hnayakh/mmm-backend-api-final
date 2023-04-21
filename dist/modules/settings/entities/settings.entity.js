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
var Settings_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let Settings = Settings_1 = class Settings extends abstract_entity_1.AbstarctEntity {
    static createMeet(status, showPhone, showEmail, isHidden, isNotification, userBasicId) {
        const settingObj = new Settings_1();
        settingObj.status = status;
        settingObj.showPhone = showPhone;
        settingObj.showEmail = showEmail;
        settingObj.isHidden = isHidden;
        settingObj.isNotification = isNotification;
        settingObj.userBasicId = userBasicId;
        return settingObj;
    }
    updateMeet(status, showPhone, showEmail, isHidden, isNotification, userBasicId) {
        this.status = status;
        this.showPhone = showPhone;
        this.showEmail = showEmail;
        this.isHidden = isHidden;
        this.isNotification = isNotification;
        this.userBasicId = userBasicId;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Settings.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Settings.prototype, "showPhone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Settings.prototype, "showEmail", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Settings.prototype, "isHidden", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Settings.prototype, "isNotification", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Settings.prototype, "userBasicId", void 0);
Settings = Settings_1 = __decorate([
    typeorm_1.Entity('user_settings')
], Settings);
exports.Settings = Settings;
//# sourceMappingURL=settings.entity.js.map