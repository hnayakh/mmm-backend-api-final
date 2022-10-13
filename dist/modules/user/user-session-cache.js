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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionCache = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const cache_manager_1 = require("cache-manager");
const user_session_1 = require("./user-session");
let UserSessionCache = class UserSessionCache {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.sessions = null;
        this.key = 'userKey';
        this.DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
        this.expired_time = 60 * 60 * 1000;
        this.sessions = [];
    }
    async addOrUpdate(userName) {
        let allUserSessions = (await this.cacheManager.get(this.key));
        let existingSession = allUserSessions === null || allUserSessions === void 0 ? void 0 : allUserSessions.find((x) => x.userName === userName);
        if (existingSession) {
            existingSession.lastConnectedTime = moment(new Date()).format(this.DATE_TIME_FORMAT);
            await this.cacheManager.set(this.key, allUserSessions, {
                ttl: this.expired_time,
            });
        }
        else {
            this.addNewUserSession(userName, allUserSessions);
        }
    }
    async addNewUserSession(userName, allUserSessions) {
        const allSessions = [...(allUserSessions !== null && allUserSessions !== void 0 ? allUserSessions : []), new user_session_1.UserSession(userName)];
        await this.cacheManager.set(this.key, allSessions, {
            ttl: this.expired_time,
        });
    }
    async get(userName) {
        const results = await this.cacheManager.get(this.key);
        return results
            ? results.find((x) => x.userName === userName)
            : null;
    }
    async getAllActive() {
        const results = (await this.cacheManager.get(this.key));
        return results === null || results === void 0 ? void 0 : results.filter((x) => x.IsConnected());
    }
    async remove(userName) {
        const results = await this.cacheManager.get(this.key);
        if (results) {
            const updatedSessions = results.filter((x) => x.userName !== userName);
            await this.cacheManager.set(this.key, updatedSessions, {
                ttl: this.expired_time,
            });
        }
    }
};
UserSessionCache = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], UserSessionCache);
exports.UserSessionCache = UserSessionCache;
//# sourceMappingURL=user-session-cache.js.map