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
var UserRequest_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequest = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let UserRequest = UserRequest_1 = class UserRequest extends abstract_entity_1.AbstarctEntity {
    static createUserRequest(requestingUserBasicId, requestedUserBasicId) {
        const userRequest = new UserRequest_1();
        userRequest.requestingUserBasicId = requestingUserBasicId;
        userRequest.requestedUserBasicId = requestedUserBasicId;
        userRequest.userRequestStatus = miscellaneous_enum_1.UserRequestStatus.Pending;
        userRequest.userRequestState = miscellaneous_enum_1.UserRequestState.NotConnected;
        userRequest.requestDate = new Date().toString();
        userRequest.operation = 0;
        return userRequest;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserRequest.prototype, "requestingUserBasicId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserRequest.prototype, "requestedUserBasicId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserRequest.prototype, "userRequestStatus", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserRequest.prototype, "userRequestState", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserRequest.prototype, "requestDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserRequest.prototype, "acceptanceRejectionDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserRequest.prototype, "operation", void 0);
UserRequest = UserRequest_1 = __decorate([
    typeorm_1.Entity('user_requests')
], UserRequest);
exports.UserRequest = UserRequest;
//# sourceMappingURL=user-request.entity.js.map