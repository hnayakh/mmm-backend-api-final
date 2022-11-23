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
var Chat_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
let Chat = Chat_1 = class Chat extends abstract_entity_1.AbstarctEntity {
    static createFaq(userbasicId, text, position) {
        const faqObj = new Chat_1();
        faqObj.userbasicId = userbasicId;
        faqObj.text = text;
        return faqObj;
    }
    updateFaq(userbasicId, text, position) {
        this.userbasicId = userbasicId;
        this.text = text;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Chat.prototype, "userbasicId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Chat.prototype, "recieverBasicId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Chat.prototype, "text", void 0);
Chat = Chat_1 = __decorate([
    typeorm_1.Entity('chat')
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=chat.entity.js.map