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
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("@nestjs/core/services");
const operators_1 = require("rxjs/operators");
const response_service_1 = require("../../shared/services/response.service");
const response_decorator_1 = require("./response.decorator");
let ResponseInterceptor = class ResponseInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        var _a;
        const responseMessage = (_a = this.reflector.get(response_decorator_1.ResponseMessageKey, context.getHandler())) !== null && _a !== void 0 ? _a : '';
        let res1 = new response_service_1.ResponseService();
        let ctx = context.switchToHttp();
        let response = ctx.getResponse();
        console.log(response);
        return next.handle().pipe(operators_1.map((data) => ({
            status: context.switchToHttp().getResponse().statusCode,
            message: data.message,
            data: data.data,
            type: "SUCCESS",
        })));
    }
};
ResponseInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [services_1.Reflector])
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map