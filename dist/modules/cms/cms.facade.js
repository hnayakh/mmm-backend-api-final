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
exports.CmsFacade = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("./cms.service");
let CmsFacade = class CmsFacade {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    async createFaq(faqDto) {
        return await this.cmsService.createFaq(faqDto);
    }
    async updateFaq(faq) {
        return await this.cmsService.updateFaq(faq);
    }
    async removeFaq(faq) {
        return await this.cmsService.removeFaq(faq);
    }
    async updateSuccess(success_stories) {
        return await this.cmsService.updateSuccess(success_stories);
    }
    async updateContent(content_create) {
        return await this.cmsService.updateContent(content_create);
    }
    async createSuccess(successDto) {
        return await this.cmsService.createSuccess(successDto);
    }
    async createContent(contentDto) {
        return await this.cmsService.createContent(contentDto);
    }
    async getAllFaq() {
        return await this.cmsService.getAllFaq();
    }
    async getAllSuccess() {
        return await this.cmsService.getAllSuccess();
    }
    async getAllContent() {
        return await this.cmsService.getAllContent();
    }
};
CmsFacade = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsFacade);
exports.CmsFacade = CmsFacade;
//# sourceMappingURL=cms.facade.js.map