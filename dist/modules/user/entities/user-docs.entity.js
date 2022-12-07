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
var UserDocs_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocs = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const user_basic_entity_1 = require("./user-basic.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let UserDocs = UserDocs_1 = class UserDocs extends abstract_entity_1.AbstarctEntity {
    static createUserDocs(imageURL, userBasic) {
        const userImage = new UserDocs_1();
        userImage.imageURL = imageURL;
        userImage.userBasic = userBasic;
        return userImage;
    }
    updateProfileUpdationStatus(profileUpdationStatus) {
        this.profileUpdationStatus = profileUpdationStatus;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserDocs.prototype, "imageURL", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserDocs.prototype, "idProof", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UserDocs.prototype, "isDefault", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UserDocs.prototype, "profileUpdationStatus", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => user_basic_entity_1.UserBasic, (userBasic) => userBasic.userDocs),
    __metadata("design:type", user_basic_entity_1.UserBasic)
], UserDocs.prototype, "userBasic", void 0);
UserDocs = UserDocs_1 = __decorate([
    typeorm_1.Entity('user_docs')
], UserDocs);
exports.UserDocs = UserDocs;
//# sourceMappingURL=user-docs.entity.js.map