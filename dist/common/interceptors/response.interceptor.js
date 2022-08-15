"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const response_service_1 = require("../../shared/services/response.service");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        let res = new response_service_1.ResponseService();
        let ctx = context.switchToHttp();
        let response = ctx.getResponse();
        return next.handle().pipe(operators_1.map((resObj) => {
            var _a;
            res.successResponse(response.statusCode, resObj.message, resObj.data, response, (_a = resObj.headers) !== null && _a !== void 0 ? _a : resObj.headers);
        }));
    }
};
ResponseInterceptor = __decorate([
    common_1.Injectable()
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map