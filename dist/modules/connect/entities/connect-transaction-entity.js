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
var ConnectTransactionEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectTransactionEntity = void 0;
const user_basic_entity_1 = require("../../user/entities/user-basic.entity");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const typeorm_1 = require("typeorm");
let ConnectTransactionEntity = ConnectTransactionEntity_1 = class ConnectTransactionEntity extends abstract_entity_1.AbstarctEntity {
    static create(userBasic, operation, externalId) {
        const obj = new ConnectTransactionEntity_1();
        obj.userBasic = userBasic;
        obj.operation = operation;
        obj.externalId = externalId;
        return obj;
    }
};
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.connectTransaction),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], ConnectTransactionEntity.prototype, "userBasic", void 0);
__decorate([
    typeorm_1.Column({ name: 'operation', nullable: false }),
    __metadata("design:type", Number)
], ConnectTransactionEntity.prototype, "operation", void 0);
__decorate([
    typeorm_1.Column({ name: 'external_id', nullable: true }),
    __metadata("design:type", String)
], ConnectTransactionEntity.prototype, "externalId", void 0);
ConnectTransactionEntity = ConnectTransactionEntity_1 = __decorate([
    typeorm_1.Entity('connect_transaction_log')
], ConnectTransactionEntity);
exports.ConnectTransactionEntity = ConnectTransactionEntity;
//# sourceMappingURL=connect-transaction-entity.js.map