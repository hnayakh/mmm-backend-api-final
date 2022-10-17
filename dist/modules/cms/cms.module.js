"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shared_module_1 = require("../../shared/shared.module");
const user_module_1 = require("../user/user.module");
const cms_controller_1 = require("./cms.controller");
const cms_facade_1 = require("./cms.facade");
const cms_repo_1 = require("./cms.repo");
const cms_service_1 = require("./cms.service");
const contentcreation_entity_1 = require("./entities/contentcreation.entity");
const faq_entity_1 = require("./entities/faq.entity");
const successstories_enity_1 = require("./entities/successstories.enity");
let CmsModule = class CmsModule {
};
CmsModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => shared_module_1.SharedModule),
            common_1.forwardRef(() => user_module_1.UserModule),
            typeorm_1.TypeOrmModule.forFeature([faq_entity_1.faq, successstories_enity_1.success_stories, contentcreation_entity_1.content_creation]),
        ],
        controllers: [cms_controller_1.CmsController],
        providers: [cms_service_1.CmsService, cms_repo_1.CmsRepo, cms_facade_1.CmsFacade],
        exports: [cms_service_1.CmsService],
    })
], CmsModule);
exports.CmsModule = CmsModule;
//# sourceMappingURL=cms.module.js.map