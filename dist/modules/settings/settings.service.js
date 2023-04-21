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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const settings_entity_1 = require("./entities/settings.entity");
const settings_repo_1 = require("./settings.repo");
const user_service_1 = require("../user/user.service");
let SettingsService = class SettingsService {
    constructor(meetRepo, userService, meet) {
        this.meetRepo = meetRepo;
        this.userService = userService;
        this.meet = meet;
    }
    async createMeet(settingObj) {
        const meetData = settings_entity_1.Settings.createMeet(settingObj.status, settingObj.showPhone, settingObj.showEmail, settingObj.isHidden, settingObj.isNotification, settingObj.userBasicId);
        return await this.meet.save(meetData);
    }
    async updateMeet(meetId, settingObj) {
        let meetResult = await this.meet.findOne({ userBasicId: meetId });
        meetResult.updateMeet(settingObj.status, settingObj.showPhone, settingObj.showEmail, settingObj.isHidden, settingObj.isNotification, settingObj.userBasicId);
        return await this.meet.save(meetResult);
    }
    async getMeet(userBasicId) {
        return await this.meet.findOne({ userBasicId: userBasicId });
    }
};
SettingsService = __decorate([
    common_1.Injectable(),
    __param(2, typeorm_1.InjectRepository(settings_entity_1.Settings)),
    __metadata("design:paramtypes", [settings_repo_1.SettingsRepo,
        user_service_1.UserService,
        typeorm_2.Repository])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map