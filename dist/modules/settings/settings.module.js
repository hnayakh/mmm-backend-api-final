"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const settings_controller_1 = require("./settings.controller");
const settings_service_1 = require("./settings.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
const shared_module_1 = require("../../shared/shared.module");
const settings_entity_1 = require("./entities/settings.entity");
const settings_facade_1 = require("./settings.facade");
const settings_repo_1 = require("./settings.repo");
let SettingsModule = class SettingsModule {
};
SettingsModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => shared_module_1.SharedModule),
            typeorm_1.TypeOrmModule.forFeature([settings_entity_1.Settings]),
        ],
        controllers: [settings_controller_1.SettingsController],
        providers: [settings_facade_1.SettingsFacade, settings_service_1.SettingsService, settings_repo_1.SettingsRepo],
        exports: [settings_service_1.SettingsService],
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map