"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../../shared/shared.module");
const user_module_1 = require("../user/user.module");
const connect_entity_1 = require("./entities/connect.entity");
const coupon_entity_1 = require("./entities/coupon.entity");
const referral_entity_1 = require("./entities/referral.entity");
const master_controller_1 = require("./master.controller");
const master_facade_1 = require("./master.facade");
const master_repo_1 = require("./master.repo");
const master_service_1 = require("./master.service");
let MasterModule = class MasterModule {
};
MasterModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => shared_module_1.SharedModule),
            typeorm_1.TypeOrmModule.forFeature([connect_entity_1.Connect, referral_entity_1.Referral, coupon_entity_1.Coupon]),
        ],
        controllers: [master_controller_1.MasterController],
        providers: [master_facade_1.MasterFacade, master_service_1.MasterService, master_repo_1.MasterRepo],
        exports: [master_service_1.MasterService],
    })
], MasterModule);
exports.MasterModule = MasterModule;
//# sourceMappingURL=master.module.js.map