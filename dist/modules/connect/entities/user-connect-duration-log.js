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
var UserConnectDurationLog_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnectDurationLog = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_connect_duration_entity_1 = require("./user-connect-duration.entity");
let UserConnectDurationLog = UserConnectDurationLog_1 = class UserConnectDurationLog extends abstract_entity_1.AbstarctEntity {
    static createUserConnectDurationLogs(usedDuration, userConnectDuration) {
        const userConnectDurationLog = new UserConnectDurationLog_1();
        userConnectDurationLog.usedDuration = usedDuration;
        userConnectDurationLog.userConnectDuration = userConnectDuration;
        return userConnectDurationLog;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnectDurationLog.prototype, "usedDuration", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_connect_duration_entity_1.UserConnectDuration, (userConnectDuration) => userConnectDuration.userConnectDurationLogs),
    __metadata("design:type", user_connect_duration_entity_1.UserConnectDuration)
], UserConnectDurationLog.prototype, "userConnectDuration", void 0);
UserConnectDurationLog = UserConnectDurationLog_1 = __decorate([
    typeorm_1.Entity('user_connect_duration_logs')
], UserConnectDurationLog);
exports.UserConnectDurationLog = UserConnectDurationLog;
//# sourceMappingURL=user-connect-duration-log.js.map