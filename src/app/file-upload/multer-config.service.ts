import { Inject, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { extname } from 'path';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  createValidationError,
  validationErrorFactory,
} from 'src/error/validation-error.function';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
import { StringGeneratorService } from 'src/service/string-generator/string-generator.service';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';

export type PhotoUploadOptions = {
  namePrefix: string;
  nameExists: (name: string) => Promise<boolean>;
};

export const PHOTO_UPLOAD_OPTIONS = 'PHOTO_UPLOAD_OPTIONS';

/**
 * Service that uses multer to upload photo to AWS S3
 */
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    @Inject(PHOTO_UPLOAD_OPTIONS)
    private readonly uploadOptions: PhotoUploadOptions,
    private readonly s3StorageService: S3StorageBucketService,
    private readonly stringGeneratorService: StringGeneratorService,
  ) {}

  async createMulterOptions(): Promise<MulterModuleOptions> {
    return {
      fileFilter(req, file, cb) {
        if (file.mimetype.split('/')[0] !== 'image') {
          cb(
            validationErrorFactory([
              createValidationError(
                file.originalname,
                'Field mimetype is invalid',
                'photo',
                ERROR_CODE.FIELD_INVALID,
              ),
            ]),
            false,
          );
        } else {
          cb(null, true);
        }
      },

      storage: multerS3({
        ...this.s3StorageService.getSaveFileParams(),
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },

        key: async (req, file, cb) => {
          try {
            const fileKey = await this.stringGeneratorService
              .setExists(this.uploadOptions.nameExists)
              .generate(
                MediaFile.NAME_CONFIG,
                true,
                `${S3StorageBucketService.PHOTO_PATH}${this.uploadOptions.namePrefix}`,
                extname(file.originalname),
              );

            cb(null, fileKey);
            console.log(file);
          } catch (error) {
            console.log(error);
            cb(error, null);
          }
        },
      }),
    };
  }
}
