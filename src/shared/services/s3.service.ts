import { Injectable, HttpStatus, LoggerService, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  keys = process.env.S3_ACCESS_KEY;
  secrets = process.env.S3_SECRET_KEY;
  s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: 'ap-south-1',
    signatureVersion: 'v4',
  });
  constructor(private readonly loggerService: Logger) {}
  async getPresignedUrl(key: string, contentType: string) {
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

  async uploadDirectlyToS3(key: string, file: any) {
    const buffer = file.buffer;
    var params = {
      Bucket: 'mmm-user-image', // Put your bucket name
      Key: key, // Put new file name
      ContentEncoding: 'base64',
      ContentDisposition: 'inline',
      Body: buffer,
      ACL: 'public-read',
    };
    try {
      const data = await this.s3.putObject(params).promise();
      console.log('***', data);
    } catch (err) {
      return 'Unable to upload the provided file.';
    }
  }
}
