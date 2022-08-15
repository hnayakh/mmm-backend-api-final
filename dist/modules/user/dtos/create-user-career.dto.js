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
exports.CreateUserCareerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
class CreateUserCareerDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'UserBasicId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' }),
    __metadata("design:type", String)
], CreateUserCareerDto.prototype, "userBasicId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Employed in can not be empty.' }),
    swagger_1.ApiProperty({ example: 'Google Inc.' }),
    __metadata("design:type", String)
], CreateUserCareerDto.prototype, "employedIn", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Occupation can not be empty.' }),
    swagger_1.ApiProperty({ example: 'SSE' }),
    __metadata("design:type", String)
], CreateUserCareerDto.prototype, "occupation", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Annual income can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.AnualIncome.FiveToSevenLacs }),
    __metadata("design:type", Number)
], CreateUserCareerDto.prototype, "annualIncome", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Highest education can not be empty.' }),
    swagger_1.ApiProperty({ example: 'Graduate' }),
    __metadata("design:type", String)
], CreateUserCareerDto.prototype, "highestEducation", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Country can not be empty.' }),
    swagger_1.ApiProperty({ example: 2 }),
    __metadata("design:type", Number)
], CreateUserCareerDto.prototype, "country", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'State can not be empty.' }),
    swagger_1.ApiProperty({ example: 1 }),
    __metadata("design:type", Number)
], CreateUserCareerDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'City can not be empty.' }),
    swagger_1.ApiProperty({ example: 3 }),
    __metadata("design:type", Number)
], CreateUserCareerDto.prototype, "city", void 0);
exports.CreateUserCareerDto = CreateUserCareerDto;
//# sourceMappingURL=create-user-career.dto.js.map