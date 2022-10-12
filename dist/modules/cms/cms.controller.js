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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cms_facade_1 = require("./cms.facade");
const faq_dto_1 = require("./dtos/faq.dto");
let CmsController = class CmsController {
    constructor(faqFacade) {
        this.faqFacade = faqFacade;
    }
    async createFaq(faqDto) {
        const faqObj = await this.faqFacade.createFaq(faqDto);
        return { data: faqObj, message: ' successfully created!!!' };
    }
    async getAllFaq() {
        const result = await this.faqFacade.getAllFaq();
        return { data: result, message: 'Results fetched successfully.' };
    }
};
__decorate([
    common_1.Post('faq'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faq_dto_1.FaqDto]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createFaq", null);
__decorate([
    common_1.Get('faq/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllFaq", null);
CmsController = __decorate([
    swagger_1.ApiTags('CMS'),
    common_1.Controller('cms'),
    __metadata("design:paramtypes", [cms_facade_1.faqFacade])
], CmsController);
exports.CmsController = CmsController;
//# sourceMappingURL=cms.controller.js.map