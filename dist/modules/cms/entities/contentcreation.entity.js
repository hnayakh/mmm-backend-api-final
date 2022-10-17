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
var content_creation_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.content_creation = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let content_creation = content_creation_1 = class content_creation extends abstract_entity_1.AbstarctEntity {
    static createSuccess(channel, template_name, content_heading, content, photo, position) {
        const Obj = new content_creation_1();
        Obj.channel = channel;
        Obj.template_name = template_name;
        Obj.content_heading = content_heading;
        Obj.content = content;
        Obj.photo = photo;
        Obj.position = position;
        return Obj;
    }
    updateSuccess(channel, template_name, content_heading, content, photo, position) {
        this.channel = channel;
        this.template_name = template_name;
        this.content_heading = content_heading;
        this.content = content;
        this.photo = photo;
        this.position = position;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], content_creation.prototype, "channel", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], content_creation.prototype, "template_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], content_creation.prototype, "content_heading", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], content_creation.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], content_creation.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], content_creation.prototype, "position", void 0);
content_creation = content_creation_1 = __decorate([
    typeorm_1.Entity('content_creation')
], content_creation);
exports.content_creation = content_creation;
//# sourceMappingURL=contentcreation.entity.js.map