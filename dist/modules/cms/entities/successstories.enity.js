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
var success_stories_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.success_stories = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../../../shared/entities/abstract.entity");
const miscellaneous_enum_1 = require("../../../shared/enums/miscellaneous.enum");
let success_stories = success_stories_1 = class success_stories extends abstract_entity_1.AbstarctEntity {
    static createSuccess(heading, story, photo, position) {
        const Obj = new success_stories_1();
        Obj.heading = heading;
        Obj.story = story;
        Obj.photo = photo;
        Obj.position = position;
        return Obj;
    }
    updateSuccess(heading, story, photo, position) {
        this.heading = heading;
        this.story = story;
        this.photo = photo;
        this.position = position;
        return this;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], success_stories.prototype, "heading", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], success_stories.prototype, "story", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], success_stories.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], success_stories.prototype, "position", void 0);
success_stories = success_stories_1 = __decorate([
    typeorm_1.Entity('success_stories')
], success_stories);
exports.success_stories = success_stories;
//# sourceMappingURL=successstories.enity.js.map