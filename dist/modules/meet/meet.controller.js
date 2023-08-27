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
exports.MeetController = void 0;
const common_1 = require("@nestjs/common");
const meet_facade_1 = require("./meet.facade");
const swagger_1 = require("@nestjs/swagger");
let MeetController = class MeetController {
    constructor(meetFacade) {
        this.meetFacade = meetFacade;
    }
    async createMeet(meetData) {
        console.log("======================== MeetData ==============================");
        console.log(meetData);
        const result = await this.meetFacade.createMeet(meetData);
        return { data: result, message: 'Meet created' };
    }
    async updateMeet(meetId, meetData) {
        const result = await this.meetFacade.updateMeet(meetId, meetData);
        return { data: result, message: 'Meet updated' };
    }
    async getMeet(userBasicId) {
        const result = await this.meetFacade.getMeet(userBasicId);
        return { data: result, message: 'Meet fetched' };
    }
};
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "createMeet", null);
__decorate([
    common_1.Post('update/:meetId'),
    __param(0, common_1.Param('meetId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "updateMeet", null);
__decorate([
    common_1.Get('get/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeetController.prototype, "getMeet", null);
MeetController = __decorate([
    swagger_1.ApiTags('Meet'),
    common_1.Controller('meet'),
    __metadata("design:paramtypes", [meet_facade_1.MeetFacade])
], MeetController);
exports.MeetController = MeetController;
//# sourceMappingURL=meet.controller.js.map