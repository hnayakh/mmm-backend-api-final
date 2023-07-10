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
exports.CreateUserBasicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
class CreateUserBasicDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Relationship can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.Relationship.Self }),
    __metadata("design:type", Number)
], CreateUserBasicDto.prototype, "relationship", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Email can not be empty.' }),
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty({ example: 'rutuparna.rout@gmail.com' }),
    __metadata("design:type", String)
], CreateUserBasicDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Gender can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.Gender.Male }),
    __metadata("design:type", Number)
], CreateUserBasicDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Country code can not be empty.' }),
    swagger_1.ApiProperty({ example: '+91' }),
    __metadata("design:type", String)
], CreateUserBasicDto.prototype, "countryCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'FirebaseToken code can not be empty.' }),
    swagger_1.ApiProperty({ example: '+91' }),
    __metadata("design:type", String)
], CreateUserBasicDto.prototype, "fireBaseToken", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Phone number code can not be empty.' }),
    swagger_1.ApiProperty({ example: '9853461442' }),
    __metadata("design:type", String)
], CreateUserBasicDto.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'User@123' }),
    __metadata("design:type", String)
], CreateUserBasicDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Phone number code can not be empty.' }),
    swagger_1.ApiProperty({ example: 'User@123' }),
    __metadata("design:type", Number)
], CreateUserBasicDto.prototype, "socialProvider", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Phone number code can not be empty.' }),
    swagger_1.ApiProperty({ example: 'User@123' }),
    __metadata("design:type", String)
], CreateUserBasicDto.prototype, "providerId", void 0);
exports.CreateUserBasicDto = CreateUserBasicDto;
//# sourceMappingURL=create-user-basic.dto.js.map