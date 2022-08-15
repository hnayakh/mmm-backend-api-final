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
exports.CreateUserHabitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
class CreateUserHabitDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'UserBasicId can not be empty.' }),
    swagger_1.ApiProperty({ example: 'c6feebb2-f5db-4958-b719-1edfca0d603e' }),
    __metadata("design:type", String)
], CreateUserHabitDto.prototype, "userBasicId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Eating Habit can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.EatingHabit.Vegetarrian }),
    __metadata("design:type", Number)
], CreateUserHabitDto.prototype, "eatingHabit", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Smoking Habit can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.SmokingHabit.Occasionally }),
    __metadata("design:type", Number)
], CreateUserHabitDto.prototype, "smokingHabit", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Drinking Habit can not be empty.' }),
    swagger_1.ApiProperty({ example: user_profile_enum_1.DrinkingHabit.Nonalcoholic }),
    __metadata("design:type", Number)
], CreateUserHabitDto.prototype, "drinkingHabit", void 0);
exports.CreateUserHabitDto = CreateUserHabitDto;
//# sourceMappingURL=create-user-habit.dto.js.map