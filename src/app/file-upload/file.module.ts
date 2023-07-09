import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import {
  MulterConfigService,
  PhotoUploadOptions,
  PHOTO_UPLOAD_OPTIONS,
} from 'src/app/file-upload/multer-config.service';
import { StringGeneratorService } from 'src/service/string-generator/string-generator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaFile, MediaFileSchema } from './schemas/file.schema';
import { FileService } from './file.service';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';
import { ConfigProviderModule } from 'src/provider/config.provider';

type PhotoUploadAsyncOptions = {
  inject?: any[];
  import?: any[];
  useFactory?: (
    ...args: any[]
  ) => Promise<PhotoUploadOptions> | PhotoUploadOptions;
};

/**
 * File Module that dynamically configures the Multer module.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MediaFile.name, schema: MediaFileSchema },
    ]),
    FileModule,
  ],
  providers: [FileService],
  exports: [FileService, MongooseModule],
})
export class FileModule {
  static registerAsync(options: PhotoUploadAsyncOptions): DynamicModule {
    const fileModule: DynamicModule = {
      module: FileModule,
      imports: [ConfigProviderModule, ...options.import],
      providers: [
        StringGeneratorService,
        S3StorageBucketService,
        {
          inject: options.inject,
          provide: PHOTO_UPLOAD_OPTIONS,
          useFactory: options.useFactory,
        },
      ],
      exports: [
        S3StorageBucketService,
        StringGeneratorService,
        PHOTO_UPLOAD_OPTIONS,
      ],
    };

    const multerModule = MulterModule.registerAsync({
      imports: [fileModule],
      inject: [
        S3StorageBucketService,
        StringGeneratorService,
        PHOTO_UPLOAD_OPTIONS,
      ],
      useClass: MulterConfigService,
    });

    fileModule.imports.push(multerModule);
    fileModule.exports.push(multerModule);

    return fileModule;
  }
}
