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
var UserConnectDuration_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnectDuration = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_connect_duration_log_1 = require("./user-connect-duration-log");
let UserConnectDuration = UserConnectDuration_1 = class UserConnectDuration extends abstract_entity_1.AbstarctEntity {
    static createUserConnectDuration(userOneBasicId, userTwoBasicId, usedDuration, totalDuration, isFirstTime) {
        const userConnectDuration = new UserConnectDuration_1();
        userConnectDuration.userTwoBasicId = userTwoBasicId;
        userConnectDuration.userOneBasicId = userOneBasicId;
        userConnectDuration.usedDuration = usedDuration;
        userConnectDuration.totalDuration = totalDuration;
        userConnectDuration.isFirstTime = isFirstTime;
        return userConnectDuration;
    }
    updateUserConnectDuration(prevUsedDuration, usedDuration) {
        this.usedDuration = prevUsedDuration + usedDuration;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserConnectDuration.prototype, "userOneBasicId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserConnectDuration.prototype, "userTwoBasicId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnectDuration.prototype, "usedDuration", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnectDuration.prototype, "totalDuration", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UserConnectDuration.prototype, "isFirstTime", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_connect_duration_log_1.UserConnectDurationLog, (userConnectDurationLogs) => userConnectDurationLogs.userConnectDuration),
    __metadata("design:type", Array)
], UserConnectDuration.prototype, "userConnectDurationLogs", void 0);
UserConnectDuration = UserConnectDuration_1 = __decorate([
    typeorm_1.Entity('user_connect_durations')
], UserConnectDuration);
exports.UserConnectDuration = UserConnectDuration;
//# sourceMappingURL=user-connect-duration.entity.js.map