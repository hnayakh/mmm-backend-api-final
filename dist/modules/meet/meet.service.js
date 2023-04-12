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
const meet_repo_1 = require("./meet.repo");
const user_service_1 = require("../user/user.service");
let MeetService = class MeetService {
    constructor(meetRepo, userService, meet) {
        this.meetRepo = meetRepo;
        this.userService = userService;
        this.meet = meet;
    }
    async createMeet(meeObject) {
        const meetData = meet_entity_1.Meet.createMeet(meeObject.lat, meeObject.status, meeObject.long, meeObject.requestedId, meeObject.requestingId, meeObject.link, meeObject.scheduleTime, meeObject.address, meeObject.type);
        return await this.meet.save(meetData);
    }
    async updateMeet(meetId, meetData) {
        let meetResult = await this.meet.findOne({ id: meetId });
        meetResult.updateMeet(meetData.lat, meetData.status, meetData.long, meetData.requestedId, meetData.requestingId, meetData.link, meetData.scheduleTime, meetData.address, meetData.type);
        return await this.meet.save(meetResult);
    }
    async getMeet(userBasicId) {
        try {
            const activeSent = await this.meetRepo.getActiveSentRequest(userBasicId);
            const activeInvites = await this.meetRepo.getActiveInvites(userBasicId);
            const activeconnections = await this.meetRepo.getActiveConnections(userBasicId);
            const activeSentconnections = await this.meetRepo.getActiveSentConnections(userBasicId);
            let requiredConnection = [...activeconnections, ...activeSentconnections];
            let userBasicIds = [];
            activeSent.forEach((input) => {
                userBasicIds.push(input.requestedId);
                userBasicIds.push(input.requestingId);
            });
            activeInvites.forEach((input) => {
                userBasicIds.push(input.requestedId);
                userBasicIds.push(input.requestingId);
            });
            requiredConnection.forEach((input) => {
                userBasicIds.push(input.requestedId);
                userBasicIds.push(input.requestingId);
            });
            const users = await this.userService.getUsersByIds(userBasicIds);
            const connectedUserForCall = await this.meetRepo.getMeetRequestByUserId(userBasicId);
            activeSent.forEach((input) => {
                input['requestedUserDeatails'] = users.find((x) => x.id == input['requestedId']);
                input['user'] = users.find((x) => x.id == input['requestedId']);
                let tempObj = {
                    isConnected: false,
                    id: null,
                };
            });
            activeInvites.forEach((input) => {
                input['requestedUserDeatails'] = users.find((x) => x.id == input['requestedId']);
                input['user'] = users.find((x) => x.id == input['requestingId']);
            });
            console.log('requiredConnection', requiredConnection);
            requiredConnection.forEach((input) => {
                let tempObj = {
                    isConnected: false,
                    id: null,
                };
                let requiredObj = {};
                if (userBasicId == input['requestedId']) {
                    input['requestedUserDeatails'] = users.find((x) => x.id == input['requestedId']);
                    input['user'] = users.find((x) => x.id == input['requestingId']);
                    let isConnectOne = connectedUserForCall.find((u) => u.requestedId == input['requestedId']);
                    console.log('connectedUserForCall', connectedUserForCall);
                    console.log('isConnectOne', isConnectOne);
                    if (isConnectOne != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                        requiredObj = isConnectOne;
                    }
                }
                else {
                    input['requestedUserDeatails'] = users.find((x) => x.id == input['requestingId']);
                    input['user'] = users.find((x) => x.id == input['requestedId']);
                    let isConnectTwo = connectedUserForCall.find((u) => u.requestingId == input['requestingId']);
                    console.log('isConnectTwo inside requiredConnection', isConnectTwo);
                    if (isConnectTwo != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                        requiredObj = isConnectTwo;
                    }
                }
            });
            console.log('activeconactiveconnections', requiredConnection);
            return {
                activeSent,
                activeconnections: requiredConnection,
                activeInvites,
            };
        }
        catch (err) {
            console.log(err);
            return {};
        }
    }
};
MeetService = __decorate([
    common_1.Injectable(),
    __param(2, typeorm_1.InjectRepository(meet_entity_1.Meet)),
    __metadata("design:paramtypes", [meet_repo_1.MeetRepo,
        user_service_1.UserService,
        typeorm_2.Repository])
], MeetService);
exports.MeetService = MeetService;
//# sourceMappingURL=meet.service.js.map