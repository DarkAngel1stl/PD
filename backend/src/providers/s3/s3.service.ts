import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private client: S3Client;

  private config;

  private logger = new Logger(S3Service.name);

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get('s3');

    if (!this.config.accessKeyId) {
      this.logger.warn('S3 access key ID not found in config');
      throw new Error('S3 accessKeyId is not defined');
    }

    if (!this.config.secretAccessKey) {
      this.logger.warn('S3 secret access key not found in config');
      throw new Error('S3 secretAccessKey is not defined');
    }

    if (!this.config.endpoint) {
      this.logger.warn('S3 endpoint not found in config');
      throw new Error('S3 endpoint is not defined');
    }

    if (!this.config.region) {
      this.logger.warn('S3 region not found in config');
      throw new Error('S3 region is not defined');
    }

    if (!this.config.bucket) {
      this.logger.warn('S3 bucket not found in config');
      throw new Error('S3 bucket is not defined');
    }

    if (!this.config.domain) {
      this.logger.warn('S3 domain not found in config');
      throw new Error('S3 domain is not defined');
    }

    this.client = new S3Client({
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
      endpoint: this.config.endpoint,
      region: this.config.region,
      forcePathStyle: true,
    });
  }

  async upload(file: Express.Multer.File, folder?: string): Promise<string> {
    const fileName = this.createNewFileName(file.originalname);

    const path = folder ? `${folder}/${fileName}` : fileName;

    const params = {
      Bucket: this.config.bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.client.send(new PutObjectCommand(params));

    const url = `${this.config.domain}/${path}`;

    return url;
  }

  getRandomString(length: number): string {
    return Math.random().toString(36).substring(2, length);
  }

  getFileFormat(fileName: string): string {
    const fileNameArray: string[] = fileName.split('.');

    return fileNameArray[fileNameArray.length - 1];
  }

  createNewFileName(oldFileName?: string) {
    const fileFormat: string = oldFileName
      ? this.getFileFormat(oldFileName)
      : '';

    const randomSymbols: string = this.getRandomString(15);

    return `${Date.now()}-${randomSymbols}${
      fileFormat ? '.' : ''
    }${fileFormat}`;
  }
}
