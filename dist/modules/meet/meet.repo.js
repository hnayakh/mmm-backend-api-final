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
exports.MeetRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const meet_entity_1 = require("./entities/meet.entity");
const typeorm_2 = require("typeorm");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
let MeetRepo = class MeetRepo {
    constructor(meet) {
        this.meet = meet;
    }
    async getMeetRequestByUserId(userBasicId) {
        return this.meet.find({
            where: [
                {
                    requestedId: userBasicId,
                    isActive: true,
                },
                {
                    requestingId: userBasicId,
                    isActive: true,
                },
            ],
        });
    }
    async getActiveSentRequest(userBasicId) {
        return await this.meet.find({
            where: {
                requestingId: userBasicId,
                status: miscellaneous_enum_1.UserMeetStatus.Pending,
            },
        });
    }
    async getActiveInvites(userBasicId) {
        return await this.meet.find({
            where: {
                requestedId: userBasicId,
                status: miscellaneous_enum_1.UserMeetStatus.Pending,
            },
        });
    }
    async getActiveConnections(userBasicId) {
        return await this.meet.find({
            where: {
                requestedId: userBasicId,
                status: miscellaneous_enum_1.UserMeetStatus.Accepted,
            },
        });
    }
    async getActiveSentConnections(userBasicId) {
        return await this.meet.find({
            where: {
                requestingId: userBasicId,
                status: miscellaneous_enum_1.UserMeetStatus.Accepted,
            },
        });
    }
};
MeetRepo = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(meet_entity_1.Meet)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MeetRepo);
exports.MeetRepo = MeetRepo;
//# sourceMappingURL=meet.repo.js.map