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
var Notification_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let Notification = Notification_1 = class Notification extends abstract_entity_1.AbstarctEntity {
    static createNotification(senderId, receiverId, message) {
        const notificationObj = new Notification_1();
        notificationObj.senderId = senderId;
        notificationObj.message = message;
        notificationObj.receiverId = receiverId;
        return notificationObj;
    }
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "senderId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "receiverId", void 0);
__decorate([
    typeorm_1.Column({}),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({}),
    __metadata("design:type", String)
], Notification.prototype, "header", void 0);
__decorate([
    typeorm_1.Column({}),
    __metadata("design:type", String)
], Notification.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ default: user_profile_enum_1.NotificationStatus.missed }),
    __metadata("design:type", Number)
], Notification.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp' }),
    __metadata("design:type", String)
], Notification.prototype, "duration", void 0);
Notification = Notification_1 = __decorate([
    typeorm_1.Entity('notifications')
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map