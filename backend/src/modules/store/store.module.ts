import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import S3Module from '../../providers/s3/s3.module';

@Module({
  imports: [S3Module],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
