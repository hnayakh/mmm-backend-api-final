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
var ProfileVisit_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileVisit = void 0;
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const typeorm_1 = require("typeorm");
const user_basic_entity_1 = require("./user-basic.entity");
let ProfileVisit = ProfileVisit_1 = class ProfileVisit extends abstract_entity_1.AbstarctEntity {
    static createVisit(visitedBy, visitedTo) {
        const visitedObj = new ProfileVisit_1();
        visitedObj.visitedBy = visitedBy;
        visitedObj.visitedTo = visitedTo;
        return visitedObj;
    }
};
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.visitedBy),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], ProfileVisit.prototype, "visitedBy", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.visitedTo),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], ProfileVisit.prototype, "visitedTo", void 0);
ProfileVisit = ProfileVisit_1 = __decorate([
    typeorm_1.Entity("profile_visit")
], ProfileVisit);
exports.ProfileVisit = ProfileVisit;
//# sourceMappingURL=user.profile.visit.js.map