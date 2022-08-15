"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../../shared/shared.module");
const master_module_1 = require("../master/master.module");
const user_basic_entity_1 = require("../user/entities/user-basic.entity");
const user_module_1 = require("../user/user.module");
const connect_controller_1 = require("./connect.controller");
const connect_facade_1 = require("./connect.facade");
const connect_repo_1 = require("./connect.repo");
const connect_service_1 = require("./connect.service");
const connect_transaction_entity_1 = require("./entities/connect-transaction-entity");
const recharge_history_entity_1 = require("./entities/recharge-history.entity");
const user_connect_duration_log_1 = require("./entities/user-connect-duration-log");
const user_connect_duration_entity_1 = require("./entities/user-connect-duration.entity");
const user_connect_log_entity_1 = require("./entities/user-connect-log.entity");
const user_connect_entity_1 = require("./entities/user-connect.entity");
const user_request_entity_1 = require("./entities/user-request.entity");
let ConnectModule = class ConnectModule {
};
ConnectModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => master_module_1.MasterModule),
            common_1.forwardRef(() => shared_module_1.SharedModule),
            common_1.forwardRef(() => user_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([
                user_basic_entity_1.UserBasic,
                user_connect_entity_1.UserConnect,
                user_connect_log_entity_1.UserConnectLog,
                user_request_entity_1.UserRequest,
                recharge_history_entity_1.RechargeHistory,
                user_connect_duration_log_1.UserConnectDurationLog,
                user_connect_duration_entity_1.UserConnectDuration,
                connect_transaction_entity_1.ConnectTransactionEntity
            ]),
        ],
        controllers: [connect_controller_1.ConnectController],
        providers: [connect_service_1.ConnectService, connect_facade_1.ConnectFacade, connect_repo_1.ConnectRepo],
        exports: [connect_service_1.ConnectService, connect_repo_1.ConnectRepo],
    })
], ConnectModule);
exports.ConnectModule = ConnectModule;
//# sourceMappingURL=connect.module.js.map