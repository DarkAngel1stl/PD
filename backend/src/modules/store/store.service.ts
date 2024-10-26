import { Injectable } from '@nestjs/common';
import { S3Service } from '../../providers/s3/s3.service';

@Injectable()
export class StoreService {
  constructor(private readonly s3: S3Service) {}

  async upload(file: Express.Multer.File) {
    return this.s3.upload(file);
  }

  async multipleUpload(images: Express.Multer.File[]) {
    const urls = [];

    for (let i = 0; i < images.length; i++) {
      const url = await this.s3.upload(images[i]);
      urls.push(url);
    }

    return urls;
  }
}
