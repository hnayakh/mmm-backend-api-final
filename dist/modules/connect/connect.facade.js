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
exports.ConnectFacade = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const s3_service_1 = require("../../shared/services/s3.service");
const master_service_1 = require("../master/master.service");
const _ = require("lodash");
const connect_service_1 = require("./connect.service");
const user_service_1 = require("../user/user.service");
let ConnectFacade = class ConnectFacade {
    constructor(connectService, userService, masterService) {
        this.connectService = connectService;
        this.userService = userService;
        this.masterService = masterService;
    }
    async getAllNotification(userBasicId) {
        try {
            return await this.userService.getAllNotification(userBasicId);
        }
        catch (err) {
            console.log(err);
        }
    }
    async getUserRequestDetails(userBasicId) {
        try {
            const activeSent = await this.connectService.getActiveSentRequest(userBasicId);
            const activeInvites = await this.connectService.getActiveInvites(userBasicId);
            const activeconnections = await this.connectService.getActiveConnections(userBasicId);
            const activeSentconnections = await this.connectService.getActiveSentConnections(userBasicId);
            console.log('activeconnections', activeSentconnections);
            let requiredConnection = [...activeconnections, ...activeSentconnections];
            console.log('requiredConnection', requiredConnection);
            let userBasicIds = [];
            activeSent.forEach((input) => {
                userBasicIds.push(input.requestedUserBasicId);
                userBasicIds.push(input.requestingUserBasicId);
            });
            activeInvites.forEach((input) => {
                userBasicIds.push(input.requestedUserBasicId);
                userBasicIds.push(input.requestingUserBasicId);
            });
            requiredConnection.forEach((input) => {
                userBasicIds.push(input.requestedUserBasicId);
                userBasicIds.push(input.requestingUserBasicId);
            });
            const blockedUser = await this.userService.getBlockedUsersForAll(userBasicId);
            const blockedUserWho = await this.userService.getBlockedUsersWhom(userBasicId);
            console.log('blockedUserWhom', blockedUserWho);
            console.log('blockedUser', blockedUser);
            const users = await this.userService.getUsersByIds(userBasicIds);
            const connectedUserForCall = await this.connectService.getUserConnectRequestsByUserId(userBasicId);
            activeSent.forEach((input) => {
                input['user'] = users.find((x) => x.id == input['requestedUserBasicId']);
                let tempObj = {
                    isConnected: false,
                    id: null,
                };
                let blockObj = {
                    isBlocked: false,
                    id: '',
                };
                let isBlockedOne = blockedUserWho.find((u) => u.block_whom == input['requestingUserBasicId']);
                let isBlockedTwo = blockedUser.find((u) => u.block_who == input['requestingUserBasicId']);
                console.log('isBlockedOne', isBlockedOne);
                console.log('isBlockedTwo', isBlockedTwo);
                if (isBlockedOne != null || isBlockedOne != undefined) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedOne.id;
                }
                if (isBlockedTwo != null || isBlockedTwo != undefined) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedTwo.id;
                }
                let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == input['requestedUserBasicId']);
                if (isConnectOne != null) {
                    (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                }
                let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == input['requestedUserBasicId']);
                if (isConnectTwo != null) {
                    (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                }
                input['user']['connectStatus'] = tempObj;
                input['requestingUserDeatails'] = users.find((x) => x.id == input['requestingUserBasicId']);
            });
            activeInvites.forEach((input) => {
                input['requestedUserDeatails'] = users.find((x) => x.id == input['requestedUserBasicId']);
                input['user'] = users.find((x) => x.id == input['requestingUserBasicId']);
                let tempObj = {
                    isConnected: false,
                    id: null,
                };
                let blockObj = {
                    isBlocked: false,
                    id: '',
                };
                let isBlockedOne = blockedUserWho.find((u) => u.block_whom == input['requestingUserBasicId']);
                let isBlockedTwo = blockedUser.find((u) => u.block_who == input['requestingUserBasicId']);
                console.log('isBlockedOne', isBlockedOne);
                console.log('isBlockedTwo', isBlockedTwo);
                if (isBlockedOne != null || isBlockedOne != undefined) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedOne.id;
                }
                if (isBlockedTwo != null || isBlockedTwo != undefined) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedTwo.id;
                }
                let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == input['requestingUserBasicId']);
                if (isConnectOne != null) {
                    (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                }
                let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == input['requestingUserBasicId']);
                if (isConnectTwo != null) {
                    (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                }
                input['user']['connectStatus'] = tempObj;
            });
            console.log('requiredConnection', requiredConnection);
            requiredConnection.forEach((input) => {
                let tempObj = {
                    isConnected: false,
                    id: null,
                };
                let requiredObj = {};
                let blockObj = {
                    isBlocked: false,
                    id: '',
                };
                let isBlockedOne = blockedUserWho.find((u) => u.block_whom == input['requestingUserBasicId']);
                let isBlockedTwo = blockedUser.find((u) => u.block_who == input['requestingUserBasicId']);
                console.log('isBlockedOne', isBlockedOne);
                console.log('isBlockedTwo', isBlockedTwo);
                if (isBlockedOne != null || isBlockedOne != undefined) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedOne.id;
                }
                if (isBlockedTwo != null || isBlockedTwo != undefined) {
                    blockObj.isBlocked = true;
                    blockObj.id = isBlockedTwo.id;
                }
                if (userBasicId == input['requestedUserBasicId']) {
                    input['user'] = users.find((x) => x.id == input['requestingUserBasicId']);
                    let isConnectOne = connectedUserForCall.find((u) => u.userOneBasicId == input['requestedUserBasicId']);
                    console.log('connectedUserForCall', connectedUserForCall);
                    console.log('isConnectOne', isConnectOne);
                    if (isConnectOne != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectOne.id);
                        requiredObj = isConnectOne;
                    }
                }
                else {
                    input['user'] = users.find((x) => x.id == input['requestedUserBasicId']);
                    let isConnectTwo = connectedUserForCall.find((u) => u.userTwoBasicId == input['requestingUserBasicId']);
                    console.log('isConnectTwo inside requiredConnection', isConnectTwo);
                    if (isConnectTwo != null) {
                        (tempObj.isConnected = true), (tempObj.id = isConnectTwo.id);
                        requiredObj = isConnectTwo;
                    }
                }
                input['user']['connectStatus'] = tempObj;
                input['user']['UserRequestStatus'] = requiredObj;
                input['requestedUserDeatails'] = users.find((x) => x.id == input['requestedUserBasicId']);
                input['requestingUserDeatails'] = users.find((x) => x.id == input['requestingUserBasicId']);
            });
            console.log('activeconactiveconnections', requiredConnection.map((x) => x));
            if (blockedUser.length > 0) {
                blockedUser.forEach((e) => {
                    requiredConnection = requiredConnection.filter((x) => x.requestingUserDeatails.id != e.block_whom);
                });
            }
            if (blockedUserWho.length > 0) {
                blockedUserWho.forEach((e) => {
                    requiredConnection = requiredConnection.filter((x) => x.requestingUserDeatails.id != e.block_who);
                });
            }
            if (blockedUser.length > 0) {
                blockedUser.forEach((e) => {
                    requiredConnection = requiredConnection.filter((x) => x.requestingUserDeatails.id != e.block_who);
                });
            }
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
    async createOrUpdateUserRequest(userRequestDto) {
        return await this.connectService.createOrUpdateUserRequest(userRequestDto);
    }
    async getRechargeHistory(userBasicId) {
        const userBasic = await this.userService.getUserById(userBasicId);
        const rechargeHistory = await this.connectService.getRechargeHistory(userBasic);
        return rechargeHistory;
    }
    async getAllRechargeHistory() {
        const rechargeHistory = await this.connectService.getAllRechargeHistory();
        return rechargeHistory;
    }
    async createRechargeHistory(rechargeHistoryDto) {
        const userBasic = await this.userService.getUserById(rechargeHistoryDto.userBasicId);
        if (_.isEmpty(userBasic)) {
            throw new common_1.HttpException('User not found.', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        const rechargeObject = await this.connectService.createRechargeHistory(rechargeHistoryDto, userBasic);
        if (rechargeHistoryDto.paymentStatus == miscellaneous_enum_1.PaymentStatus.Pending ||
            rechargeHistoryDto.paymentStatus == miscellaneous_enum_1.PaymentStatus.Failed) {
            return rechargeObject;
        }
        const userConnect = await this.connectService.getUserConnect(userBasic);
        let prevConnectBalance = _.isEmpty(userConnect)
            ? 0
            : userConnect.connectBalance;
        if (_.isEmpty(userConnect)) {
            await this.connectService.createUserConnects(rechargeHistoryDto.connectCount, userBasic);
        }
        else {
            await this.connectService.updateUserConnects(userConnect, rechargeHistoryDto.connectCount, userBasic, 'add');
        }
        await this.connectService.createUserConnectLogs(prevConnectBalance, prevConnectBalance + rechargeHistoryDto.connectCount, rechargeHistoryDto.connectCount, 1, 'Added connect.', userBasic);
        return rechargeObject;
    }
    async getUserConnect(userBasicId) {
        const userBasic = await this.userService.getUserById(userBasicId);
        return await this.connectService.getUserConnect(userBasic);
    }
    async createOrUpdateUserConnectDuration(userConnectDurationDto) {
        let userConnectReqObj = await this.connectService.getUserConnectRequestById(userConnectDurationDto.userConnectRequestId);
        console.log('userConnectReqObj', userConnectReqObj);
        if (userConnectReqObj == null) {
            throw new common_1.HttpException('Invalid Id', common_1.HttpStatus.EXPECTATION_FAILED);
        }
        return await this.connectService.createUserConnectDurationLog(userConnectDurationDto, userConnectReqObj);
    }
    async getAllUserRequest() {
        return await this.connectService.getAllUserRequest();
    }
    async createOrUpdateUserConnectRequest(userConnectRequestDto) {
        let masterConnect = await this.masterService.getConnects();
        const userOneBasic = await this.userService.getUserById(userConnectRequestDto.userOneBasicId);
        if (userConnectRequestDto.userConnectRequestId == '' ||
            userConnectRequestDto.userConnectRequestId == null) {
            console.log('here');
            try {
                const userOneConnect = await this.connectService.getUserConnect(userOneBasic);
                console.log('userOneConnect', userOneConnect);
                await this.connectService.updateUserConnects(userOneConnect, 1, userOneBasic, userConnectRequestDto.type);
                await this.connectService.addConnectTransaction(userOneBasic, 0, userConnectRequestDto.userTwoBasicId);
                return await this.connectService.createUserConnectRequest(userConnectRequestDto, masterConnect[0]);
            }
            catch (error) {
                return error;
            }
        }
        else {
            console.log('then');
            try {
                await this.connectService.addConnectTransaction(userOneBasic, 0, userConnectRequestDto.userTwoBasicId);
                return await this.connectService.updateUserConnectRequest(userConnectRequestDto, masterConnect[0]);
            }
            catch (errorLog) {
                console.log(errorLog);
                return errorLog;
            }
        }
    }
    async getUserConnectDuration(userConnectDurationDto) {
        let respObj = {
            minutesLeft: 0,
            userConnectRequestId: null,
        };
        const obj = await this.connectService.getUserConnectDurationByUserIdsActive(userConnectDurationDto.userOneBasicId, userConnectDurationDto.userTwoBasicId);
        if (obj.length == 0) {
            let masterConnect = await this.masterService.getConnects();
            const objExist = await this.connectService.getUserConnectDurationByUserIds(userConnectDurationDto.userOneBasicId, userConnectDurationDto.userTwoBasicId);
            respObj.minutesLeft =
                objExist.length == 0
                    ? masterConnect[0].firstTimeBenifitMins
                    : masterConnect[0].secondTimeBenifitMins;
        }
        else {
            respObj.minutesLeft = obj[0].totalDuration - obj[0].usedDuration;
            respObj.userConnectRequestId = obj[0].id;
        }
        return respObj;
    }
    async getAllUserConnectDuration(userBasicId) {
        let respObj = {
            minutesLeft: 0,
            userConnectRequestId: null,
        };
        const obj = await this.connectService.getUserConnectDurationAllUserActive(userBasicId);
        return obj;
    }
    async getConnectTransaction(userBasicId) {
        return await this.connectService.getConnectTransactions(userBasicId);
    }
    async getalluserConnectTransactions() {
        return await this.connectService.getalluserConnectTransactions();
    }
};
ConnectFacade = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [connect_service_1.ConnectService,
        user_service_1.UserService,
        master_service_1.MasterService])
], ConnectFacade);
exports.ConnectFacade = ConnectFacade;
//# sourceMappingURL=connect.facade.js.map