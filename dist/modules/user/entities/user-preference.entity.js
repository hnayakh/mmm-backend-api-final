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
var UserPreference_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreference = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
let UserPreference = UserPreference_1 = class UserPreference extends abstract_entity_1.AbstarctEntity {
    static createPreference(minAge, maxAge, minHeight, maxHeight, maritalStatus, country, state, city, religion, caste, motherTongue, highestEducation, occupation, maxIncome, minIncome, dietaryHabits, drinkingHabits, smokingHabits, challenged, userBasic) {
        const up = new UserPreference_1();
        up.minAge = minAge;
        up.maxAge = maxAge;
        up.minHeight = minHeight;
        up.maxHeight = maxHeight;
        up.maritalStatus = maritalStatus;
        up.country = country;
        up.state = state;
        up.city = city;
        up.religion = religion;
        up.caste = caste;
        up.motherTongue = motherTongue;
        up.highestEducation = highestEducation;
        up.occupation = occupation;
        up.maxIncome = maxIncome;
        up.minIncome = minIncome;
        up.dietaryHabits = dietaryHabits;
        up.drinkingHabits = drinkingHabits;
        up.smokingHabits = smokingHabits;
        up.challenged = challenged;
        up.userBasic = userBasic;
        return up;
    }
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserPreference.prototype, "minAge", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserPreference.prototype, "maxAge", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserPreference.prototype, "minHeight", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], UserPreference.prototype, "maxHeight", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "maritalStatus", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "religion", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "caste", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "motherTongue", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "highestEducation", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "occupation", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "maxIncome", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "minIncome", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "dietaryHabits", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserPreference.prototype, "drinkingHabits", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "smokingHabits", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserPreference.prototype, "challenged", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userPreferences),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserPreference.prototype, "userBasic", void 0);
UserPreference = UserPreference_1 = __decorate([
    typeorm_1.Entity('user_preferences')
], UserPreference);
exports.UserPreference = UserPreference;
//# sourceMappingURL=user-preference.entity.js.map