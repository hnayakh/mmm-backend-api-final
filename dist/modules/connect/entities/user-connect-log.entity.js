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
var UserConnectLog_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnectLog = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("../../user/entities/user-basic.entity");
let UserConnectLog = UserConnectLog_1 = class UserConnectLog extends abstract_entity_1.AbstarctEntity {
    static createUserConnectLogs(prevConnectBalance, currentConnectBalance, changeAmount, operation, reason, userBasic) {
        const userConnectLogs = new UserConnectLog_1();
        userConnectLogs.prevConnectBalance = prevConnectBalance;
        userConnectLogs.currentConnectBalance = currentConnectBalance;
        userConnectLogs.changeAmount = changeAmount;
        userConnectLogs.operation = operation;
        userConnectLogs.reason = reason;
        userConnectLogs.userBasic = userBasic;
        return userConnectLogs;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnectLog.prototype, "prevConnectBalance", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnectLog.prototype, "currentConnectBalance", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnectLog.prototype, "changeAmount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnectLog.prototype, "operation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserConnectLog.prototype, "reason", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userConnectLogs),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserConnectLog.prototype, "userBasic", void 0);
UserConnectLog = UserConnectLog_1 = __decorate([
    typeorm_1.Entity('user_connect_logs')
], UserConnectLog);
exports.UserConnectLog = UserConnectLog;
//# sourceMappingURL=user-connect-log.entity.js.map