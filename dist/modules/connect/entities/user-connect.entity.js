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
var UserConnect_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnect = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_basic_entity_1 = require("../../user/entities/user-basic.entity");
let UserConnect = UserConnect_1 = class UserConnect extends abstract_entity_1.AbstarctEntity {
    static createUserConnect(connectBalance, userBasic) {
        const userConnect = new UserConnect_1();
        userConnect.connectBalance = connectBalance;
        userConnect.userBasic = userBasic;
        return userConnect;
    }
    updateUserConnect(conBalance, operation) {
        this.connectBalance = operation == 'add' ? this.connectBalance + conBalance : this.connectBalance - conBalance;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserConnect.prototype, "connectBalance", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userConnects),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserConnect.prototype, "userBasic", void 0);
UserConnect = UserConnect_1 = __decorate([
    typeorm_1.Entity('user_connects')
], UserConnect);
exports.UserConnect = UserConnect;
//# sourceMappingURL=user-connect.entity.js.map