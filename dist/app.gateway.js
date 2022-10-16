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
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const user_session_cache_1 = require("./modules/user/user-session-cache");
let AppGateway = class AppGateway {
    constructor(userSessionCache) {
        this.userSessionCache = userSessionCache;
        this.logger = new common_1.Logger('AppGateway');
    }
    async checkOnlineUser(client, userBasicId) {
        this.logger.log('allOnlineUsers', userBasicId);
        this.userSessionCache.addOrUpdate(userBasicId);
        let activeUsers = await this.userSessionCache.getAllActiveUsers(userBasicId);
        console.log('activeUsers', activeUsers);
        let respObj = {
            status: 200,
            message: 'Online Members',
            data: activeUsers,
            type: 'SUCCESS',
        };
        this.server.emit('all_online_users_list', respObj);
    }
    async checkMyOnlineUser(client, userBasicId) {
        this.logger.log('onlineUsers', userBasicId);
        console.log('userBasicId', userBasicId);
        this.userSessionCache.addOrUpdate(userBasicId);
        let activeUsers = await this.userSessionCache.getMyOnlineUSers(userBasicId);
        console.log('activeUsers', activeUsers);
        let respObj = {
            status: 200,
            message: 'Online Members',
            data: activeUsers,
            type: 'SUCCESS',
        };
        this.server.emit('online_users_list', respObj);
    }
    async checkAuserOnlineStatus(client, userBasicId) {
        this.logger.log('userOnlineStatus', userBasicId);
        this.userSessionCache.addOrUpdate(userBasicId);
        let activeUsers = await this.userSessionCache.getUserOnlineStatus(userBasicId);
        console.log('activeUsers', activeUsers);
        let respObj = {
            status: 200,
            message: 'Online Members',
            data: activeUsers,
            type: 'SUCCESS',
        };
        this.server.emit('online_users_status', respObj);
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('allOnlineUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "checkOnlineUser", null);
__decorate([
    websockets_1.SubscribeMessage('onlineUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "checkMyOnlineUser", null);
__decorate([
    websockets_1.SubscribeMessage('userOnlineStatus'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "checkAuserOnlineStatus", null);
AppGateway = __decorate([
    websockets_1.WebSocketGateway({ cors: true }),
    __metadata("design:paramtypes", [user_session_cache_1.UserSessionCache])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map