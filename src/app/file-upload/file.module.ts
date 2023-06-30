import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import {
  MulterConfigService,
  PhotoUploadOptions,
  PHOTO_UPLOAD_OPTIONS,
} from 'src/app/file-upload/multer-config.service';
import { ConfigModule } from '@nestjs/config';
import { GcpStorageBucketService } from 'src/service/storage-bucket/gcp.storage-bucket.service';
import { StringGeneratorService } from 'src/service/string-generator/string-generator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaFile, MediaFileSchema } from './schemas/file.schema';
import { FileService } from './file.service';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';

type PhotoUploadAsyncOptions = {
  inject?: any[];
  import?: any[];
  useFactory?: (
    ...args: any[]
  ) => Promise<PhotoUploadOptions> | PhotoUploadOptions;
};

/**
 * Photo Module that dynamically configures the Multer module.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MediaFile.name, schema: MediaFileSchema },
    ]),
    PhotoModule,
  ],
  providers: [FileService],
  exports: [FileService, MongooseModule],
})
export class PhotoModule {
  static registerAsync(options: PhotoUploadAsyncOptions): DynamicModule {
    const photoModule: DynamicModule = {
      module: PhotoModule,
      imports: [ConfigModule, ...options.import],
      providers: [
        GcpStorageBucketService,
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
        GcpStorageBucketService,
        StringGeneratorService,
        PHOTO_UPLOAD_OPTIONS,
      ],
    };

    const multerModule = MulterModule.registerAsync({
      imports: [photoModule],
      inject: [
        GcpStorageBucketService,
        S3StorageBucketService,
        StringGeneratorService,
        PHOTO_UPLOAD_OPTIONS,
      ],
      useClass: MulterConfigService,
    });

    photoModule.imports.push(multerModule);
    photoModule.exports.push(multerModule);

    return photoModule;
  }
}
