"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const response_service_1 = require("../../shared/services/response.service");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        let res = new response_service_1.ResponseService();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const next = ctx.getNext();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const err = exception.getResponse();
        const errMsg = err.status == 400
            ? err.response.message[0]
            : err.message != undefined
                ? err.message
                : err;
        res.errorResponse(err.status != undefined ? err.status : status, errMsg, response);
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=exception.filter.js.map