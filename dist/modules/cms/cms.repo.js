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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const miscellaneous_enum_1 = require("../../shared/enums/miscellaneous.enum");
const typeorm_2 = require("typeorm");
const contentcreation_entity_1 = require("./entities/contentcreation.entity");
const faq_entity_1 = require("./entities/faq.entity");
const successstories_enity_1 = require("./entities/successstories.enity");
let CmsRepo = class CmsRepo {
    constructor(success_stories, faq, content_creation) {
        this.success_stories = success_stories;
        this.faq = faq;
        this.content_creation = content_creation;
    }
    async createFaq(faqDto) {
        return await this.faq.save(faqDto);
    }
    async removeFaq(faqDto) {
        return await this.faq.delete(faqDto);
    }
    async updateFaq(faq) {
        return this.faq.save(Object.assign({}, faq));
    }
    async getAllFaq() {
        return await this.faq.find();
    }
    async getAllSuccess() {
        return await this.success_stories.find();
    }
    async createSuccess(SuccessStoriesDto) {
        return await this.success_stories.save(SuccessStoriesDto);
    }
    async updateSuccess(success_stories) {
        return await this.success_stories.save(Object.assign({}, success_stories));
    }
    async createContent(ContentCreationDto) {
        return await this.content_creation.save(ContentCreationDto);
    }
    async getAllContent() {
        return await this.content_creation.find();
    }
    async updateContent(content_creation) {
        return await this.content_creation.save(Object.assign({}, content_creation));
    }
};
CmsRepo = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(successstories_enity_1.success_stories)),
    __param(1, typeorm_1.InjectRepository(faq_entity_1.faq)),
    __param(2, typeorm_1.InjectRepository(contentcreation_entity_1.content_creation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CmsRepo);
exports.CmsRepo = CmsRepo;
//# sourceMappingURL=cms.repo.js.map