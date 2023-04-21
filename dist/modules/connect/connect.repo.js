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
exports.ConnectRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const typeorm_2 = require("typeorm");
const connect_transaction_entity_1 = require("./entities/connect-transaction-entity");
const recharge_history_entity_1 = require("./entities/recharge-history.entity");
const user_connect_duration_log_1 = require("./entities/user-connect-duration-log");
const user_connect_duration_entity_1 = require("./entities/user-connect-duration.entity");
const user_connect_log_entity_1 = require("./entities/user-connect-log.entity");
const user_connect_entity_1 = require("./entities/user-connect.entity");
const user_request_entity_1 = require("./entities/user-request.entity");
let ConnectRepo = class ConnectRepo {
    constructor(userConnectRepo, userConnectLogRepo, rechargeHistoryRepo, userRequestRepo, userConnectDurationRepo, userConnectDurationLogRepo, connectTransactionRepo) {
        this.userConnectRepo = userConnectRepo;
        this.userConnectLogRepo = userConnectLogRepo;
        this.rechargeHistoryRepo = rechargeHistoryRepo;
        this.userRequestRepo = userRequestRepo;
        this.userConnectDurationRepo = userConnectDurationRepo;
        this.userConnectDurationLogRepo = userConnectDurationLogRepo;
        this.connectTransactionRepo = connectTransactionRepo;
    }
    async createUserConnect(userConnect) {
        return await this.userConnectRepo.save(userConnect);
    }
    async createUserConnectLog(userConnectLog) {
        return await this.userConnectLogRepo.save(userConnectLog);
    }
    async getUserConnectByUserBasic(userBasic) {
        return await this.userConnectRepo.findOne({
            where: {
                userBasic: userBasic,
            },
        });
    }
    async addConnectTransaction(userBasic, operation, externalId) {
        const connectTransaction = connect_transaction_entity_1.ConnectTransactionEntity.create(userBasic, operation, externalId);
        console.log(connectTransaction);
        try {
            return await this.connectTransactionRepo.save(connectTransaction);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getRechargeHistory(userBasic) {
        return await this.rechargeHistoryRepo.find({
            where: {
                userBasic: userBasic,
            },
        });
    }
    async updateUserConnect(userConnect) {
        return await this.userConnectRepo.save(Object.assign({}, userConnect));
    }
    async createRechargeHistory(rechargeHistory) {
        return await this.rechargeHistoryRepo.save(rechargeHistory);
    }
    async getRechargeHistoryByUserBasic(userBasic) {
        return await this.rechargeHistoryRepo.find({
            where: {
                userBasic: userBasic,
            },
        });
    }
    async getAllRechargeHistory() {
        return await this.rechargeHistoryRepo.find();
    }
    async getAllUserRequest() {
        const entityManager = typeorm_2.getManager();
        let rawQuery = `select ctl.id as transactionId,
    ctl.updatedAt as updatedAt,
    ctl.operation ,
    ctl.userRequestState,
    ctl.userRequestStatus,
    ctl.acceptanceRejectionDate,
    ctl.requestDate,
    ctl.createdAt,
    uv.name as requestedName,
    uva.id as userId,
    uva.displayId,
    uv.displayId as receiverDisplayId,
    uv.id as receiverId,
    uva.activationStatus,
    uva.name as requestingName,
    uva.imageURL,
    uva.thumbnailURL
    from user_requests ctl
    join users_view_admin uv on ctl.requestedUserBasicId = uv.id
    join users_view_admin uva on
    ctl.requestingUserBasicId = uva.id group by uva.id;`;
        const userDet = await entityManager.query(rawQuery);
        console.log(userDet);
        return userDet;
    }
    async getUserRequestById(id) {
        return await this.userRequestRepo.findOne({
            where: {
                id: id,
            },
        });
    }
    async updateUserRequest(userRequest) {
        return await this.userRequestRepo.save(Object.assign({}, userRequest));
    }
    async createUserRequest(userRequest) {
        return await this.userRequestRepo.save(userRequest);
    }
    async getRequestValidation(requestedUserBasicId, requestingUserBasicId) {
        return await this.userRequestRepo.findOne({
            where: [
                {
                    requestedUserBasicId: requestingUserBasicId,
                    requestingUserBasicId: requestedUserBasicId,
                },
                {
                    requestedUserBasicId: requestedUserBasicId,
                    requestingUserBasicId: requestingUserBasicId,
                },
            ],
        });
    }
    async getUserRequestStatusForAppPrefAndFilter(userBasicId) {
        return await this.userRequestRepo.find({
            where: [
                {
                    requestedUserBasicId: userBasicId,
                },
                {
                    requestingUserBasicId: userBasicId,
                },
            ],
        });
    }
    async getActiveSentRequest(userBasicId) {
        return await this.userRequestRepo.find({
            where: {
                requestingUserBasicId: userBasicId,
                userRequestStatus: miscellaneous_enum_1.UserRequestStatus.Pending,
            },
        });
    }
    async getActiveInvites(userBasicId) {
        return await this.userRequestRepo.find({
            where: {
                requestedUserBasicId: userBasicId,
                userRequestStatus: miscellaneous_enum_1.UserRequestStatus.Pending,
            },
        });
    }
    async getActiveConnections(userBasicId) {
        return await this.userRequestRepo.find({
            where: {
                requestedUserBasicId: userBasicId,
                userRequestStatus: miscellaneous_enum_1.UserRequestStatus.Accepted,
            },
        });
    }
    async getActiveSentConnections(userBasicId) {
        return await this.userRequestRepo.find({
            where: {
                requestingUserBasicId: userBasicId,
                userRequestStatus: miscellaneous_enum_1.UserRequestStatus.Accepted,
            },
        });
    }
    async createUserConnectDuration(userConnectDuration) {
        return await this.userConnectDurationRepo.save(userConnectDuration);
    }
    async updateUserConnectDuration(userConnectDuration) {
        return await this.userConnectDurationRepo.save(Object.assign({}, userConnectDuration));
    }
    async getConnectDurationById(userConnectDurationId) {
        return await this.userConnectDurationRepo.findOne({
            where: {
                id: userConnectDurationId,
            },
            relations: ['userConnectDurationLogs'],
        });
    }
    async getUserConnectDurationByUserIds(userOneBasicId, userTwoBasicId) {
        return await this.userConnectDurationRepo.find({
            where: [
                {
                    userOneBasicId: userOneBasicId,
                    userTwoBasicId: userTwoBasicId,
                },
                {
                    userTwoBasicId: userOneBasicId,
                    userOneBasicId: userTwoBasicId,
                },
            ],
        });
    }
    async getUserConnectRequestsByUserId(userBasicId) {
        return await this.userConnectDurationRepo.find({
            where: [
                {
                    userOneBasicId: userBasicId,
                    isActive: true,
                },
                {
                    userTwoBasicId: userBasicId,
                    isActive: true,
                },
            ],
        });
    }
    async getUserConnectDurationByUserIdsActive(userOneBasicId, userTwoBasicId) {
        return await this.userConnectDurationRepo.find({
            where: [
                {
                    userOneBasicId: userOneBasicId,
                    userTwoBasicId: userTwoBasicId,
                    isActive: true,
                },
                {
                    userTwoBasicId: userOneBasicId,
                    userOneBasicId: userTwoBasicId,
                    isActive: true,
                },
            ],
        });
    }
    async createUserConnectDurationLog(logObj) {
        return await this.userConnectDurationLogRepo.save(logObj);
    }
    async getUserConnectRequestById(userConnectRequestId) {
        return await this.userConnectDurationRepo.findOne({
            where: {
                id: userConnectRequestId,
            },
        });
    }
    async getUserConnectDurationAllUserActive(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `select uva.id as userId,
    ucd.id as connectId,
    uva.displayId,
    ucd.usedDuration,
    ucd.totalDuration,
    uva.activationStatus,
    uva.name,
    uva.imageURL,
    uva.thumbnailURL
    from user_connect_durations ucd
    left join users_view_admin uva on
    (ucd.userOneBasicId = uva.id and ucd.userOneBasicId <> '${userBasicId}')
    or (ucd.userTwoBasicId = uva.id and ucd.userTwoBasicId <> '${userBasicId}')
    WHERE ucd.isActive
    AND (ucd.userOneBasicId = '${userBasicId}'
    OR ucd.userTwoBasicId = '${userBasicId}');`;
        const userDet = await entityManager.query(rawQuery);
        return userDet;
    }
    async getmyTransactions(userBasicId) {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `select ctl.id        as transactionId,
    ctl.updatedAt as updatedAt,
    ctl.operation as transactionType,
    uva.id        as userId,
    uva.displayId,
    uva.activationStatus,
    uva.name,
    uva.imageURL,
    uva.thumbnailURL
from connect_transaction_log ctl
      left join users_view_admin uva on
 ctl.external_id = uva.id
where ctl.userBasicId = '${userBasicId}';`;
        const transactions = await entityManager.query(rawQuery);
        return transactions;
    }
    async getAllTransactions() {
        const entityManager = typeorm_2.getManager();
        const rawQuery = `select ctl.id as transactionId,
    ctl.updatedAt as updatedAt,
    ctl.operation as transactionType,
    uva.id        as userId,
    uva.displayId,
    uva.activationStatus,
    uva.name,
    uva.imageURL,
    uva.thumbnailURL
from connect_transaction_log ctl
       join users_view_admin uva on
 ctl.external_id = uva.id;`;
        console.log('here');
        const transactions = await entityManager.query(rawQuery);
        console.log(transactions);
        return transactions;
    }
};
ConnectRepo = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_connect_entity_1.UserConnect)),
    __param(1, typeorm_1.InjectRepository(user_connect_log_entity_1.UserConnectLog)),
    __param(2, typeorm_1.InjectRepository(recharge_history_entity_1.RechargeHistory)),
    __param(3, typeorm_1.InjectRepository(user_request_entity_1.UserRequest)),
    __param(4, typeorm_1.InjectRepository(user_connect_duration_entity_1.UserConnectDuration)),
    __param(5, typeorm_1.InjectRepository(user_connect_duration_log_1.UserConnectDurationLog)),
    __param(6, typeorm_1.InjectRepository(connect_transaction_entity_1.ConnectTransactionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ConnectRepo);
exports.ConnectRepo = ConnectRepo;
//# sourceMappingURL=connect.repo.js.map