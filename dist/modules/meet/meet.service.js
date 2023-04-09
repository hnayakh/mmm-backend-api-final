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
exports.MeetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const meet_entity_1 = require("./entities/meet.entity");
let MeetService = class MeetService {
    constructor(meet) {
        this.meet = meet;
    }
    async createMeet(meeObject) {
        const meetData = meet_entity_1.Meet.createMeet(meeObject.lat, meeObject.status, meeObject.long, meeObject.requestedId, meeObject.requestingId, meeObject.link, meeObject.scheduleTime, meeObject.address);
        return await this.meet.save(meetData);
    }
    async updateMeet(meetId, meetData) {
        let meetResult = await this.meet.findOne({ id: meetId });
        console.log('meetResult', meetResult);
        console.log('meetData', meetData);
        meetResult.updateMeet(meetData.lat, meetData.status, meetData.long, meetData.requestedId, meetData.requestingId, meetData.link, meetData.scheduleTime, meetData.address);
        return await this.meet.save(meetResult);
    }
};
MeetService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(meet_entity_1.Meet)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MeetService);
exports.MeetService = MeetService;
//# sourceMappingURL=meet.service.js.map