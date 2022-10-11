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
var faq_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.faq = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let faq = faq_1 = class faq extends abstract_entity_1.AbstarctEntity {
    static createFaq(question, answer, position) {
        const faqObj = new faq_1();
        faqObj.question = question;
        faqObj.answer = answer;
        faqObj.position = position;
        return faqObj;
    }
    updateFaq(question, answer, position) {
        this.question = question;
        this.answer = answer;
        this.position = position;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], faq.prototype, "question", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], faq.prototype, "answer", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], faq.prototype, "position", void 0);
faq = faq_1 = __decorate([
    typeorm_1.Entity('faq')
], faq);
exports.faq = faq;
//# sourceMappingURL=faq.entity.js.map