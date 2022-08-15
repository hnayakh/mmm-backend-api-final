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
exports.CreateUserPreferenceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
class CreateUserPreferenceDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'UserBasicId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' }),
    __metadata("design:type", String)
], CreateUserPreferenceDto.prototype, "userBasicId", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 20 }),
    __metadata("design:type", Number)
], CreateUserPreferenceDto.prototype, "minAge", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 80 }),
    __metadata("design:type", Number)
], CreateUserPreferenceDto.prototype, "maxAge", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 89 }),
    __metadata("design:type", Number)
], CreateUserPreferenceDto.prototype, "minHeight", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 110 }),
    __metadata("design:type", Number)
], CreateUserPreferenceDto.prototype, "maxHeight", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [1, 2] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "maritalStatus", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "country", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "city", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "religion", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "caste", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "motherTongue", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "highestEducation", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [' ', ' '] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "occupation", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [1, 2] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "maxIncome", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [1, 2] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "minIncome", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [1, 2] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "dietaryHabits", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [1, 2] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "drinkingHabits", void 0);
__decorate([
    swagger_1.ApiProperty({ example: [1, 2] }),
    __metadata("design:type", Array)
], CreateUserPreferenceDto.prototype, "smokingHabits", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], CreateUserPreferenceDto.prototype, "challenged", void 0);
exports.CreateUserPreferenceDto = CreateUserPreferenceDto;
//# sourceMappingURL=create-user-preference.dto.js.map