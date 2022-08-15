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
exports.AbstarctEntity = void 0;
const typeorm_1 = require("typeorm");
class AbstarctEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], AbstarctEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], AbstarctEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ default: 'system_user' }),
    __metadata("design:type", String)
], AbstarctEntity.prototype, "createdBy", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], AbstarctEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column({ default: 'system_user' }),
    __metadata("design:type", String)
], AbstarctEntity.prototype, "updatedBy", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], AbstarctEntity.prototype, "isActive", void 0);
exports.AbstarctEntity = AbstarctEntity;
//# sourceMappingURL=abstract.entity.js.map