"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetModule = void 0;
const common_1 = require("@nestjs/common");
const meet_controller_1 = require("./meet.controller");
const meet_service_1 = require("./meet.service");
let MeetModule = class MeetModule {
};
MeetModule = __decorate([
    common_1.Module({
        controllers: [meet_controller_1.MeetController],
        providers: [meet_service_1.MeetService],
    })
], MeetModule);
exports.MeetModule = MeetModule;
//# sourceMappingURL=meet.module.js.map