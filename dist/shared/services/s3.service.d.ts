import { Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
export declare class S3Service {
    private readonly loggerService;
    keys: string;
    secrets: string;
    s3: AWS.S3;
    constructor(loggerService: Logger);
    getPresignedUrl(key: string, contentType: string): Promise<string>;
    uploadDirectlyToS3(key: string, file: any): Promise<string>;
}
