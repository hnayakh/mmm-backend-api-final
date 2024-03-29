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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const settings_facade_1 = require("./settings.facade");
const swagger_1 = require("@nestjs/swagger");
let SettingsController = class SettingsController {
    constructor(meetFacade) {
        this.meetFacade = meetFacade;
    }
    async createMeet(meetData) {
        const result = await this.meetFacade.createMeet(meetData);
        return { data: result, message: 'Settings created' };
    }
    async updateMeet(meetId, meetData) {
        const result = await this.meetFacade.updateMeet(meetId, meetData);
        return { data: result, message: 'Settings updated' };
    }
    async getMeet(userBasicId) {
        const result = await this.meetFacade.getMeet(userBasicId);
        return { data: result, message: 'Settings fetched' };
    }
};
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "createMeet", null);
__decorate([
    common_1.Post('update/:userBasicID'),
    __param(0, common_1.Param('userBasicID')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updateMeet", null);
__decorate([
    common_1.Get('get/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getMeet", null);
SettingsController = __decorate([
    swagger_1.ApiTags('UserSettings'),
    common_1.Controller('settings'),
    __metadata("design:paramtypes", [settings_facade_1.SettingsFacade])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map