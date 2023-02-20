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
var UserBlock_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlock = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
let UserBlock = UserBlock_1 = class UserBlock extends abstract_entity_1.AbstarctEntity {
    static createUserBlock(block_who, block_whom) {
        const userBlock = new UserBlock_1();
        userBlock.block_who = block_who;
        userBlock.block_whom = block_whom;
        return userBlock;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserBlock.prototype, "block_who", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserBlock.prototype, "block_whom", void 0);
UserBlock = UserBlock_1 = __decorate([
    typeorm_1.Entity('user_blocks')
], UserBlock);
exports.UserBlock = UserBlock;
//# sourceMappingURL=block-user.entity.js.map