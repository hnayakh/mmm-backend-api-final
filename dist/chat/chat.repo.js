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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const miscellaneous_enum_1 = require("../shared/enums/miscellaneous.enum");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entity/chat.entity");
let ChatRepo = class ChatRepo {
    constructor(chatEntity) {
        this.chatEntity = chatEntity;
    }
    async allMessages() {
        return {
            userbasicId: 'etyuwteqtyqw',
            rhewuiryuewr: 'ewrhewgjhrewr',
        };
    }
    async sendMessage(MessageDto) {
        this.chatEntity.save(MessageDto);
    }
    async MyMessage(payload) {
        const entityManager = typeorm_2.getManager();
        let query = `select * From chat 
    WHERE (userbasicId = '${payload.userbasicId}' AND recieverBasicId='${payload.recieverBasicId}') OR
         (userbasicId = '${payload.recieverBasicId}' AND recieverBasicId='${payload.userbasicId}') ORDER BY createdAt DESC; `;
        console.log(query);
        let myMessages = entityManager.query(query);
        return myMessages;
    }
};
ChatRepo = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(chat_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatRepo);
exports.ChatRepo = ChatRepo;
//# sourceMappingURL=chat.repo.js.map