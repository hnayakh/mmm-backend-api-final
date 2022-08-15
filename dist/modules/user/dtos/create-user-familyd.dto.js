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
exports.CreateUserFamilyDDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
class CreateUserFamilyDDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'UserBasicId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' }),
    __metadata("design:type", String)
], CreateUserFamilyDDto.prototype, "userBasicId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Father occupation can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.FatherOccupation.Business }),
    __metadata("design:type", Number)
], CreateUserFamilyDDto.prototype, "fatherOccupation", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Mother occupation can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.MotherOccupation.HomeMaker }),
    __metadata("design:type", Number)
], CreateUserFamilyDDto.prototype, "motherOccupation", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'No. of brothers can not be empty.' }),
    swagger_1.ApiProperty({ example: 0 }),
    __metadata("design:type", Number)
], CreateUserFamilyDDto.prototype, "numberOfBrothers", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Married No. of brothers can not be empty.' }),
    swagger_1.ApiProperty({ example: 0 }),
    __metadata("design:type", Number)
], CreateUserFamilyDDto.prototype, "marriedNumberOfBrothers", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'No. of sisters can not be empty.' }),
    swagger_1.ApiProperty({ example: 0 }),
    __metadata("design:type", Number)
], CreateUserFamilyDDto.prototype, "numberOfSisters", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Married No. of sisters can not be empty.' }),
    swagger_1.ApiProperty({ example: 0 }),
    __metadata("design:type", Number)
], CreateUserFamilyDDto.prototype, "marriedNumberOfSisters", void 0);
exports.CreateUserFamilyDDto = CreateUserFamilyDDto;
//# sourceMappingURL=create-user-familyd.dto.js.map