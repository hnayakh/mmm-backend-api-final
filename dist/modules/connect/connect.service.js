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
exports.ConnectService = void 0;
const common_1 = require("@nestjs/common");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const connect_repo_1 = require("./connect.repo");
const recharge_history_entity_1 = require("./entities/recharge-history.entity");
const user_connect_duration_log_1 = require("./entities/user-connect-duration-log");
const user_connect_duration_entity_1 = require("./entities/user-connect-duration.entity");
const user_connect_log_entity_1 = require("./entities/user-connect-log.entity");
const user_connect_entity_1 = require("./entities/user-connect.entity");
const user_request_entity_1 = require("./entities/user-request.entity");
let ConnectService = class ConnectService {
    constructor(connectRepo) {
        this.connectRepo = connectRepo;
    }
    async updateUserConnects(userConnect, connectCount, userBasic, operation) {
        userConnect.updateUserConnect(connectCount, operation);
        return await this.connectRepo.updateUserConnect(userConnect);
    }
    async createUserConnects(connectCount, userBasic) {
        const uc = user_connect_entity_1.UserConnect.createUserConnect(connectCount, userBasic);
        return await this.connectRepo.createUserConnect(uc);
    }
    async createUserConnectLogs(prevConnectBalance, currentConnectBalance, changeAmount, operation, reason, userBasic) {
        const ucl = user_connect_log_entity_1.UserConnectLog.createUserConnectLogs(prevConnectBalance, currentConnectBalance, changeAmount, operation, reason, userBasic);
        return await this.connectRepo.createUserConnectLog(ucl);
    }
    async createRechargeHistory(input, userBasic) {
        const rh = recharge_history_entity_1.RechargeHistory.createRechargeHistory(input.actualAmount, input.discountedAmount, input.isCouponApplied, input.couponCode, input.connectCount, input.date, input.modeOfPayment, input.transactionId, input.paymentStatus, input.failureReason, userBasic);
        return await this.connectRepo.createRechargeHistory(rh);
    }
    async getRechargeHistory(userBasic) {
        return await this.connectRepo.getRechargeHistory(userBasic);
    }
    async getUserConnect(userBasic) {
        return await this.connectRepo.getUserConnectByUserBasic(userBasic);
    }
    async addConnectTransaction(userOneBasic, operation, externalId) {
        return await this.connectRepo.addConnectTransaction(userOneBasic, operation, externalId);
    }
    async createOrUpdateUserRequest(userRequestDto) {
        const userRequest = await this.connectRepo.getUserRequestById(userRequestDto.userRequestId);
        if (userRequest != null)
            userRequest.operation = userRequestDto.operation;
        switch (userRequestDto.operation) {
            case 0:
                const existingRequest = await this.connectRepo.getRequestValidation(userRequestDto.requestedUserBasicId, userRequestDto.requestingUserBasicId);
                if (existingRequest != null) {
                    userRequest.userRequestStatus = miscellaneous_enum_1.UserRequestStatus.Pending;
                    userRequest.userRequestState = miscellaneous_enum_1.UserRequestState.NotConnected;
                    return await this.connectRepo.updateUserRequest(userRequest);
                }
                const userReq = user_request_entity_1.UserRequest.createUserRequest(userRequestDto.requestingUserBasicId, userRequestDto.requestedUserBasicId);
                return await this.connectRepo.createUserRequest(userReq);
            case 1:
                userRequest.userRequestStatus = miscellaneous_enum_1.UserRequestStatus.Accepted;
                userRequest.userRequestState = miscellaneous_enum_1.UserRequestState.Active;
                return await this.connectRepo.updateUserRequest(userRequest);
            case 2:
                userRequest.userRequestStatus = miscellaneous_enum_1.UserRequestStatus.Rejected;
                userRequest.userRequestState = miscellaneous_enum_1.UserRequestState.NotConnected;
                return await this.connectRepo.updateUserRequest(userRequest);
            case 3:
                userRequest.userRequestStatus = miscellaneous_enum_1.UserRequestStatus.Reverted;
                userRequest.userRequestState = miscellaneous_enum_1.UserRequestState.NotConnected;
                return await this.connectRepo.updateUserRequest(userRequest);
            case 4:
                userRequest.userRequestStatus = miscellaneous_enum_1.UserRequestStatus.Reverted;
                userRequest.userRequestState = miscellaneous_enum_1.UserRequestState.RemovedByRequestingUser;
                return await this.connectRepo.updateUserRequest(userRequest);
            case 5:
                userRequest.userRequestStatus = miscellaneous_enum_1.UserRequestStatus.Rejected;
                userRequest.userRequestState = miscellaneous_enum_1.UserRequestState.RemovedByRequestedUser;
                return await this.connectRepo.updateUserRequest(userRequest);
            default:
                return userRequest;
        }
    }
    async getUserRequestById(id) {
        return await this.connectRepo.getUserRequestById(id);
    }
    async getActiveSentRequest(userBasicId) {
        return await this.connectRepo.getActiveSentRequest(userBasicId);
    }
    async getActiveInvites(userBasicId) {
        return await this.connectRepo.getActiveInvites(userBasicId);
    }
    async getActiveConnections(userBasicId) {
        return await this.connectRepo.getActiveConnections(userBasicId);
    }
    async getUserRequestStatusForAppPrefAndFilter(userBasicId) {
        return await this.connectRepo.getUserRequestStatusForAppPrefAndFilter(userBasicId);
    }
    async createUserConnectDuration(input, masterConnect) {
        let prevConnectedObj = await this.connectRepo.getUserConnectDurationByUserIds(input.userOneBasicId, input.userTwoBasicId);
        let obj = user_connect_duration_entity_1.UserConnectDuration.createUserConnectDuration(input.userOneBasicId, input.userTwoBasicId, input.usedDuration, prevConnectedObj.length == 0 ? masterConnect.firstTimeBenifitMins : masterConnect.secondTimeBenifitMins, true);
        if (obj.usedDuration >= obj.totalDuration) {
            obj.isActive = false;
        }
        const createdDurationObj = await this.connectRepo.createUserConnectDuration(obj);
        let logObj = user_connect_duration_log_1.UserConnectDurationLog.createUserConnectDurationLogs(input.usedDuration, createdDurationObj);
        await this.connectRepo.createUserConnectDurationLog(logObj);
        return createdDurationObj;
    }
    async createUserConnectDurationLog(input, userConnectReqObj) {
        userConnectReqObj.usedDuration += input.usedDuration;
        if (userConnectReqObj.usedDuration >= userConnectReqObj.totalDuration) {
            userConnectReqObj.isActive = false;
        }
        await this.connectRepo.updateUserConnectDuration(userConnectReqObj);
        let logObj = user_connect_duration_log_1.UserConnectDurationLog.createUserConnectDurationLogs(input.usedDuration, userConnectReqObj);
        return await this.connectRepo.createUserConnectDurationLog(logObj);
    }
    async createUserConnectRequest(input, masterConnect) {
        let prevConnectedObj = await this.connectRepo.getUserConnectDurationByUserIds(input.userOneBasicId, input.userTwoBasicId);
        let obj = user_connect_duration_entity_1.UserConnectDuration.createUserConnectDuration(input.userOneBasicId, input.userTwoBasicId, 0, prevConnectedObj.length == 0 ? masterConnect.firstTimeBenifitMins : masterConnect.secondTimeBenifitMins, true);
        const createdDurationObj = await this.connectRepo.createUserConnectDuration(obj);
        return createdDurationObj;
    }
    async updateUserConnectDuration(input, masterConnect) {
        let connectDuration = await this.connectRepo.getConnectDurationById(input.userConnectRequestId);
        connectDuration.usedDuration += input.usedDuration;
        if (connectDuration.usedDuration >= connectDuration.totalDuration) {
            connectDuration.isActive = false;
        }
        let logObj = user_connect_duration_log_1.UserConnectDurationLog.createUserConnectDurationLogs(input.usedDuration, connectDuration);
        await this.connectRepo.createUserConnectDurationLog(logObj);
        return await this.connectRepo.updateUserConnectDuration(connectDuration);
    }
    async updateUserConnectRequest(input, masterConnect) {
        let connectDuration = await this.connectRepo.getConnectDurationById(input.userConnectRequestId);
        connectDuration.isActive = false;
        return await this.connectRepo.updateUserConnectDuration(connectDuration);
    }
    async getUserConnectDurationByUserIdsActive(userOneBasicId, userTwoBasicId) {
        return await this.connectRepo.getUserConnectDurationByUserIdsActive(userOneBasicId, userTwoBasicId);
    }
    async getUserConnectDurationByUserIds(userOneBasicId, userTwoBasicId) {
        return await this.connectRepo.getUserConnectDurationByUserIds(userOneBasicId, userTwoBasicId);
    }
    async getUserConnectRequestById(userConnectRequestId) {
        return await this.connectRepo.getUserConnectRequestById(userConnectRequestId);
    }
    async getUserConnectRequestsByUserId(userBasicId) {
        return await this.connectRepo.getUserConnectRequestsByUserId(userBasicId);
    }
    async getUserConnectDurationAllUserActive(userOneBasicId) {
        return await this.connectRepo.getUserConnectDurationAllUserActive(userOneBasicId);
    }
    async getConnectTransactions(userBasicId) {
        const transactions = await this.connectRepo.getmyTransactions(userBasicId);
        return transactions;
    }
    async getalluserConnectTransactions() {
        const transactions = await this.connectRepo.getAllTransactions();
        return transactions;
    }
};
ConnectService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [connect_repo_1.ConnectRepo])
], ConnectService);
exports.ConnectService = ConnectService;
//# sourceMappingURL=connect.service.js.map