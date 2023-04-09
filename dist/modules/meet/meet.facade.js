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
exports.MeetFacade = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const axios_service_1 = require("../../shared/services/axios.service");
const meet_service_1 = require("./meet.service");
let MeetFacade = class MeetFacade {
    constructor(meetService) {
        this.meetService = meetService;
    }
    async createMeet(meetData) {
        return await this.meetService.createMeet(meetData);
    }
    async updateMeet(meetId, meetData) {
        return await this.meetService.updateMeet(meetId, meetData);
    }
    async getMeet() {
    }
};
MeetFacade = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [meet_service_1.MeetService])
], MeetFacade);
exports.MeetFacade = MeetFacade;
//# sourceMappingURL=meet.facade.js.map