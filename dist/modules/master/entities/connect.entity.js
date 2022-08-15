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
var Connect_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let Connect = Connect_1 = class Connect extends abstract_entity_1.AbstarctEntity {
    static createConnect(connectPrice, discountType, discount, discountedPrice, firstTimeBenifitMins, secondTimeBenifitMins) {
        const connectObj = new Connect_1();
        connectObj.connectPrice = connectPrice;
        connectObj.discountType = discountType;
        connectObj.discount = discount;
        connectObj.discountedPrice = discountedPrice;
        connectObj.firstTimeBenifitMins = firstTimeBenifitMins;
        connectObj.secondTimeBenifitMins = secondTimeBenifitMins;
        return connectObj;
    }
    updateConnect(connectPrice, discountType, discount, discountedPrice, firstTimeBenifitMins, secondTimeBenifitMins) {
        this.connectPrice = connectPrice;
        this.discountType = discountType;
        this.discount = discount;
        this.discountedPrice = discountedPrice;
        this.firstTimeBenifitMins = firstTimeBenifitMins;
        this.secondTimeBenifitMins = secondTimeBenifitMins;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Connect.prototype, "connectPrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Connect.prototype, "discountType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Connect.prototype, "discount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Connect.prototype, "discountedPrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Connect.prototype, "firstTimeBenifitMins", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Connect.prototype, "secondTimeBenifitMins", void 0);
Connect = Connect_1 = __decorate([
    typeorm_1.Entity('connects')
], Connect);
exports.Connect = Connect;
//# sourceMappingURL=connect.entity.js.map