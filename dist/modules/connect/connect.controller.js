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
exports.ConnectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const connect_facade_1 = require("./connect.facade");
const recharge_history_dto_1 = require("./dtos/recharge-history.dto");
const user_connect_duration_dto_1 = require("./dtos/user-connect-duration.dto");
const user_request_dto_1 = require("./dtos/user-request.dto");
let ConnectController = class ConnectController {
    constructor(connectFacade) {
        this.connectFacade = connectFacade;
    }
    async createRechargeHistory(rechargeHistoryDto) {
        const rechargeObj = await this.connectFacade.createRechargeHistory(rechargeHistoryDto);
        return { data: rechargeObj, message: 'Recharge successful!!!' };
    }
    async getRechargeHistory(userBasicId) {
        const rechargeHistory = await this.connectFacade.getRechargeHistory(userBasicId);
        return {
            data: rechargeHistory,
            message: 'Recharge history fetched successfully!',
        };
    }
    async getAllRecharge() {
        const rechargeHistory = await this.connectFacade.getAllRechargeHistory();
        return {
            data: rechargeHistory,
            message: 'Recharge history fetched successfully!',
        };
    }
    async getUserConnect(userBasicId) {
        const rechargeHistory = await this.connectFacade.getUserConnect(userBasicId);
        return {
            data: rechargeHistory,
            message: 'User connect fetched successfully!',
        };
    }
    async createOrUpdateUserRequest(userRequestDto) {
        const userReqObj = await this.connectFacade.createOrUpdateUserRequest(userRequestDto);
        return { data: userReqObj, message: 'Operation successfully completed.' };
    }
    async getUserRequestDetails(userBasicId) {
        const userRequestDetails = await this.connectFacade.getUserRequestDetails(userBasicId);
        return {
            data: userRequestDetails,
            message: 'Operation successfully completed.',
        };
    }
    async createOrUpdateUserConnectRequest(userConnectRequestDto) {
        const resp = await this.connectFacade.createOrUpdateUserConnectRequest(userConnectRequestDto);
        return { data: resp, message: 'Operation successfully completed.' };
    }
    async createOrUpdateUserConnectDuration(userConnectDurationDto) {
        const resp = await this.connectFacade.createOrUpdateUserConnectDuration(userConnectDurationDto);
        return { data: resp, message: 'Operation successfully completed.' };
    }
    async getUserConnectDuration(userOneBasicId, userTwoBasicId) {
        let userConnectDurationDto = {
            userOneBasicId,
            userTwoBasicId,
        };
        const resp = await this.connectFacade.getUserConnectDuration(userConnectDurationDto);
        return { data: resp, message: 'Operation successfully completed.' };
    }
    async getUserallConnect(userBasicId) {
        const connectDurationHistory = await this.connectFacade.getAllUserConnectDuration(userBasicId);
        return {
            data: connectDurationHistory,
            message: 'User connect fetched successfully!',
        };
    }
    async getuserConnectTransactions(userBasicId) {
        const connectTransactions = await this.connectFacade.getConnectTransaction(userBasicId);
        return {
            data: connectTransactions,
            message: 'Transactions fetched successfully!',
        };
    }
    async getalluserConnectTransactions() {
        console.log("getalluserConnectTransactions");
        const connectTransactions = await this.connectFacade.getalluserConnectTransactions();
        return {
            data: connectTransactions,
            message: 'Transactions  fetched successfully!',
        };
    }
};
__decorate([
    common_1.Post('recharge'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recharge_history_dto_1.RechargeHistoryDto]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "createRechargeHistory", null);
__decorate([
    common_1.Get('recharge/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getRechargeHistory", null);
__decorate([
    common_1.Get('all_recharge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getAllRecharge", null);
__decorate([
    common_1.Get('user_connect/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getUserConnect", null);
__decorate([
    common_1.Post('user_request'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_request_dto_1.UserRequestDto]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "createOrUpdateUserRequest", null);
__decorate([
    common_1.Get('user_request/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getUserRequestDetails", null);
__decorate([
    common_1.Post('user_connect_request'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_connect_duration_dto_1.UserConnectRequestDto]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "createOrUpdateUserConnectRequest", null);
__decorate([
    common_1.Post('user_connect_duration'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_connect_duration_dto_1.UserConnectDurationDto]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "createOrUpdateUserConnectDuration", null);
__decorate([
    swagger_1.ApiQuery({ name: 'userOneBasicId', required: false }),
    swagger_1.ApiQuery({ name: 'userTwoBasicId', required: false }),
    common_1.Get('user_connect_duration'),
    __param(0, common_1.Query('userOneBasicId')),
    __param(1, common_1.Query('userTwoBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getUserConnectDuration", null);
__decorate([
    common_1.Get('user_allconnect/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getUserallConnect", null);
__decorate([
    common_1.Get('connect_transaction/:userBasicId'),
    __param(0, common_1.Param('userBasicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getuserConnectTransactions", null);
__decorate([
    common_1.Get('all_connect_transaction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "getalluserConnectTransactions", null);
ConnectController = __decorate([
    swagger_1.ApiTags('Connect'),
    common_1.Controller('connects'),
    __metadata("design:paramtypes", [connect_facade_1.ConnectFacade])
], ConnectController);
exports.ConnectController = ConnectController;
//# sourceMappingURL=connect.controller.js.map