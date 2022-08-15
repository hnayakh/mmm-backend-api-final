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
var UserHabit_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHabit = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
const user_profile_enum_1 = require("../../../shared/enums/user-profile.enum");
let UserHabit = UserHabit_1 = class UserHabit extends abstract_entity_1.AbstarctEntity {
    static createUserHabit(eatingHabit, smokingHabit, drinkingHabit, userBasic) {
        const userHabit = new UserHabit_1();
        userHabit.eatingHabit = eatingHabit;
        userHabit.smokingHabit = smokingHabit;
        userHabit.drinkingHabit = drinkingHabit;
        userHabit.profileUpdationStatus = miscellaneous_enum_1.ProfileUpdationStatus.Pending;
        userHabit.userBasic = userBasic;
        return userHabit;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserHabit.prototype, "eatingHabit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserHabit.prototype, "smokingHabit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserHabit.prototype, "drinkingHabit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserHabit.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userHabits),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserHabit.prototype, "userBasic", void 0);
UserHabit = UserHabit_1 = __decorate([
    typeorm_1.Entity('user_habits')
], UserHabit);
exports.UserHabit = UserHabit;
//# sourceMappingURL=user-habit.entity.js.map