import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { StoreService } from './store.service';
import { SkipAuth } from '../../decorators/skip-auth.decorator';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('store')
@ApiTags('Store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @SkipAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.storeService.upload(file);
  }

  @SkipAuth()
  @UseInterceptors(FilesInterceptor('images'))
  @Post('multiple-upload')
  multipleUpload(@UploadedFiles() images: Express.Multer.File[]) {
    return this.storeService.multipleUpload(images);
  }
}
