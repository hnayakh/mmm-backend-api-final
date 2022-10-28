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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_repo_1 = require("./chat.repo");
let ChatService = class ChatService {
    constructor(ChatRepo) {
        this.ChatRepo = ChatRepo;
    }
    async allMessages(payload) {
        console.log(payload);
        return await this.ChatRepo.allMessages();
    }
    async sendMessage(payload) {
        return await this.ChatRepo.sendMessage(payload);
    }
    async MyMessage(payload) {
        return await this.ChatRepo.MyMessage(payload);
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [chat_repo_1.ChatRepo])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map