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
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const cms_repo_1 = require("./cms.repo");
let CmsService = class CmsService {
    constructor(cmsRepo) {
        this.cmsRepo = cmsRepo;
    }
    async createFaq(faqDto) {
        return await this.cmsRepo.createFaq(faqDto);
    }
    async updateFaq(faq) {
        return await this.cmsRepo.updateFaq(faq);
    }
    async removeFaq(faq) {
        return await this.cmsRepo.removeFaq(faq);
    }
    async updateSuccess(success_stories) {
        return await this.cmsRepo.updateSuccess(success_stories);
    }
    async updateContent(content_creates) {
        return await this.cmsRepo.updateContent(content_creates);
    }
    async createSuccess(successDto) {
        return await this.cmsRepo.createSuccess(successDto);
    }
    async createContent(contentDto) {
        return await this.cmsRepo.createContent(contentDto);
    }
    async getAllFaq() {
        return await this.cmsRepo.getAllFaq();
    }
    async getAllSuccess() {
        return await this.cmsRepo.getAllSuccess();
    }
    async getAllContent() {
        return await this.cmsRepo.getAllContent();
    }
};
CmsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cms_repo_1.CmsRepo])
], CmsService);
exports.CmsService = CmsService;
//# sourceMappingURL=cms.service.js.map