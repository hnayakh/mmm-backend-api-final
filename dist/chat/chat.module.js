"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../shared/shared.module");
const chat_repo_1 = require("./chat.repo");
const chat_service_1 = require("./chat.service");
const chat_entity_1 = require("./entity/chat.entity");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [common_1.forwardRef(() => shared_module_1.SharedModule), typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat])],
        controllers: [],
        providers: [chat_service_1.ChatService, chat_repo_1.ChatRepo],
        exports: [chat_service_1.ChatService],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map