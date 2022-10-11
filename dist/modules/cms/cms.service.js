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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const cms_repo_1 = require("./cms.repo");
let FaqService = class FaqService {
    constructor(cmsRepo) {
        this.cmsRepo = cmsRepo;
    }
    async createFaq(faqDto) {
        return await this.cmsRepo.createFaq(faqDto);
    }
    async getAllFaq() {
        return await this.cmsRepo.getAllFaq();
    }
};
FaqService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cms_repo_1.CmsRepo])
], FaqService);
exports.FaqService = FaqService;
//# sourceMappingURL=cms.service.js.map