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
exports.FaqDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
class FaqDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'question can not be empty.' }),
    swagger_1.ApiProperty({ example: 100 }),
    __metadata("design:type", String)
], FaqDto.prototype, "question", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'answer can not be empty.' }),
    swagger_1.ApiProperty({ example: 100 }),
    __metadata("design:type", String)
], FaqDto.prototype, "answer", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'answer can not be empty.' }),
    swagger_1.ApiProperty({ example: 100 }),
    __metadata("design:type", Number)
], FaqDto.prototype, "position", void 0);
exports.FaqDto = FaqDto;
//# sourceMappingURL=faq.dto.js.map