"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
let ResponseService = class ResponseService {
    errorResponse(status, message, res) {
        const errorDto = {
            status: status,
            message: message,
            data: null,
            type: 'FAILURE',
        };
        return res.status(status).json(errorDto);
    }
    successResponse(status, message, data, res, headers) {
        const responseDto = {
            status: status,
            message: message,
            data: data,
            type: 'SUCCESS',
        };
        return res.status(status).json(responseDto);
    }
};
ResponseService = __decorate([
    common_1.Injectable()
], ResponseService);
exports.ResponseService = ResponseService;
//# sourceMappingURL=response.service.js.map