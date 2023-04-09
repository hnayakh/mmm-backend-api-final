"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetModule = void 0;
const common_1 = require("@nestjs/common");
const meet_controller_1 = require("./meet.controller");
const meet_service_1 = require("./meet.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
const shared_module_1 = require("../../shared/shared.module");
const meet_entity_1 = require("./entities/meet.entity");
const meet_facade_1 = require("./meet.facade");
const meet_repo_1 = require("./meet.repo");
let MeetModule = class MeetModule {
};
MeetModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            common_1.forwardRef(() => shared_module_1.SharedModule),
            typeorm_1.TypeOrmModule.forFeature([meet_entity_1.Meet]),
        ],
        controllers: [meet_controller_1.MeetController],
        providers: [meet_facade_1.MeetFacade, meet_service_1.MeetService, meet_repo_1.MeetRepo],
        exports: [meet_service_1.MeetService],
    })
], MeetModule);
exports.MeetModule = MeetModule;
//# sourceMappingURL=meet.module.js.map