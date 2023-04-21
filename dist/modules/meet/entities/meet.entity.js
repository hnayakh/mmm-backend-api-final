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
var Meet_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meet = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let Meet = Meet_1 = class Meet extends abstract_entity_1.AbstarctEntity {
    static createMeet(lat, status, long, requestedId, requestingId, link, scheduleTime, address, type) {
        const meetObj = new Meet_1();
        meetObj.status = status;
        meetObj.scheduleTime = scheduleTime;
        meetObj.requestedId = requestedId;
        meetObj.requestingId = requestingId;
        meetObj.address = address;
        meetObj.link = link;
        meetObj.lat = lat;
        meetObj.long = long;
        meetObj.type = type;
        return meetObj;
    }
    updateMeet(lat, status, long, requestedId, requestingId, link, scheduleTime, address, type) {
        this.status = status;
        this.scheduleTime = scheduleTime;
        this.requestedId = requestedId;
        this.requestingId = requestingId;
        this.address = address;
        this.link = link;
        this.lat = lat;
        this.long = long;
        this.type = type;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Meet.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'double' }),
    __metadata("design:type", Number)
], Meet.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column({ type: 'double' }),
    __metadata("design:type", Number)
], Meet.prototype, "long", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Meet.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Meet.prototype, "requestedId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Meet.prototype, "requestingId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Meet.prototype, "link", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Meet.prototype, "scheduleTime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Meet.prototype, "address", void 0);
Meet = Meet_1 = __decorate([
    typeorm_1.Entity('meets')
], Meet);
exports.Meet = Meet;
//# sourceMappingURL=meet.entity.js.map