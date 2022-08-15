"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const master_module_1 = require("../modules/master/master.module");
const user_module_1 = require("../modules/user/user.module");
const axios_service_1 = require("./services/axios.service");
const response_service_1 = require("./services/response.service");
const s3_service_1 = require("./services/s3.service");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    common_1.Module({
        imports: [
            axios_1.HttpModule,
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => master_module_1.MasterModule),
        ],
        providers: [response_service_1.ResponseService, s3_service_1.S3Service, axios_service_1.AxiosService, common_1.Logger],
        exports: [response_service_1.ResponseService, s3_service_1.S3Service, axios_service_1.AxiosService],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map