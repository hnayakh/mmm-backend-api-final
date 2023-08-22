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
exports.AxiosService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let AxiosService = class AxiosService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    post(url, data, headers) {
        return new Promise((resolve, reject) => {
            try {
                this.httpService
                    .post(url, JSON.stringify(data), { headers: headers })
                    .subscribe((response) => {
                    resolve(response.data);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    postRaw(url, data) {
        return new Promise((resolve, reject) => {
            try {
                this.httpService.post(url, data).subscribe((response) => {
                    resolve(response.data);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    multipartPost(url, data) {
        return new Promise((resolve, reject) => {
            try {
                var multipart = new FormData();
                multipart.append('image_file', data.buffer);
                console.log(multipart);
                this.httpService.post(url, multipart).subscribe((response) => {
                    resolve(response.data);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    put(url, data) {
        return new Promise((resolve, reject) => {
            try {
                this.httpService
                    .put(url, JSON.stringify(data))
                    .subscribe((response) => {
                    resolve(response.data);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    get(url) {
        return new Promise((resolve, reject) => {
            try {
                this.httpService.get(url).subscribe((response) => {
                    resolve(response.data);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getImageBuffer(url) {
        return new Promise((resolve, reject) => {
            try {
                this.httpService
                    .get(url, { responseType: 'arraybuffer' })
                    .subscribe((response) => {
                    resolve(response);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    delete(url) {
        return new Promise((resolve, reject) => {
            try {
                this.httpService.delete(url).subscribe((response) => {
                    resolve(response);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
};
AxiosService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AxiosService);
exports.AxiosService = AxiosService;
//# sourceMappingURL=axios.service.js.map