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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let S3Service = class S3Service {
    constructor(loggerService) {
        this.loggerService = loggerService;
        this.keys = process.env.S3_ACCESS_KEY;
        this.secrets = process.env.S3_SECRET_KEY;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
            region: 'ap-south-1',
            signatureVersion: 'v4',
        });
    }
    async getPresignedUrl(key, contentType) {
        this.loggerService.error('Data', { key, contentType });
        this.loggerService.error({ kio: this.keys, mio: this.secrets });
        let url = this.s3.getSignedUrl('putObject', {
            Bucket: 'mmm-user-image',
            Key: key,
            Expires: 300,
            ACL: 'public-read',
        });
        this.loggerService.error('S3 URL', url);
        return url;
    }
    async uploadDirectlyToS3(key, file) {
        const buffer = file.buffer;
        var params = {
            Bucket: 'mmm-user-image',
            Key: key,
            ContentEncoding: 'base64',
            ContentDisposition: 'inline',
            Body: buffer,
            ACL: 'public-read',
        };
        try {
            const data = await this.s3.putObject(params).promise();
            console.log('***', data);
        }
        catch (err) {
            return 'Unable to upload the provided file.';
        }
    }
};
S3Service = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.Logger])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map