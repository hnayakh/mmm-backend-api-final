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
exports.UpdateUserDocsDto = exports.CreateUserBioImageDto = exports.CreateUserImageDocsDto = exports.CreateUserImageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserImageDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateUserImageDto.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiProperty({ example: false }),
    __metadata("design:type", Boolean)
], CreateUserImageDto.prototype, "isDefault", void 0);
exports.CreateUserImageDto = CreateUserImageDto;
class CreateUserImageDocsDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Identification Proof can not be empty.' }),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateUserImageDocsDto.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'My Passport' }),
    __metadata("design:type", String)
], CreateUserImageDocsDto.prototype, "idProof", void 0);
__decorate([
    swagger_1.ApiProperty({ example: false }),
    __metadata("design:type", Boolean)
], CreateUserImageDocsDto.prototype, "isDefaultImage", void 0);
exports.CreateUserImageDocsDto = CreateUserImageDocsDto;
class CreateUserBioImageDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'UserBasicId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' }),
    __metadata("design:type", String)
], CreateUserBioImageDto.prototype, "userBasicId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'About can not be empty.' }),
    swagger_1.ApiProperty({ example: 'I am from Bhubaneswar.' }),
    __metadata("design:type", String)
], CreateUserBioImageDto.prototype, "aboutMe", void 0);
__decorate([
    swagger_1.ApiProperty({ type: [CreateUserImageDto] }),
    __metadata("design:type", Array)
], CreateUserBioImageDto.prototype, "userImages", void 0);
exports.CreateUserBioImageDto = CreateUserBioImageDto;
class UpdateUserDocsDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'UserBasicId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' }),
    __metadata("design:type", String)
], UpdateUserDocsDto.prototype, "userBasicId", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'My Passport' }),
    __metadata("design:type", String)
], UpdateUserDocsDto.prototype, "idProof", void 0);
__decorate([
    swagger_1.ApiProperty({ type: [CreateUserImageDocsDto] }),
    __metadata("design:type", Array)
], UpdateUserDocsDto.prototype, "userDocImages", void 0);
__decorate([
    swagger_1.ApiProperty({ type: [CreateUserImageDocsDto] }),
    __metadata("design:type", Array)
], UpdateUserDocsDto.prototype, "userDocs", void 0);
exports.UpdateUserDocsDto = UpdateUserDocsDto;
//# sourceMappingURL=create-user-bio-image.dto.js.map