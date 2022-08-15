"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Referral_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Referral = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let Referral = Referral_1 = class Referral extends abstract_entity_1.AbstarctEntity {
    static createReferral() {
        const refObj = new Referral_1();
        refObj.isActive = true;
        return refObj;
    }
    updateReferral(isActive) {
        this.isActive = isActive.toString() == 'true' ? true : false;
        return this;
    }
};
Referral = Referral_1 = __decorate([
    typeorm_1.Entity('referrals')
], Referral);
exports.Referral = Referral;
//# sourceMappingURL=referral.entity.js.map