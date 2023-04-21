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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsFacade = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const axios_service_1 = require("../../shared/services/axios.service");
const settings_service_1 = require("./settings.service");
let SettingsFacade = class SettingsFacade {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async createMeet(meetData) {
        return await this.settingsService.createMeet(meetData);
    }
    async updateMeet(meetId, meetData) {
        return await this.settingsService.updateMeet(meetId, meetData);
    }
    async getMeet(userBasicId) {
        return await this.settingsService.getMeet(userBasicId);
    }
};
SettingsFacade = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsFacade);
exports.SettingsFacade = SettingsFacade;
//# sourceMappingURL=settings.facade.js.map