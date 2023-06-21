import { Inject, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
// import { extname } from 'path';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  createValidationError,
  validationErrorFactory,
} from 'src/error/validation-error.function';
// import { Photo } from 'src/app/file-upload/schemas/photo.schema';
import { StorageBucketService } from 'src/service/storage-bucket/storage-bucket.service';
import { StringGeneratorService } from 'src/service/string-generator/string-generator.service';
// import multer from 'multer';

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
    private readonly storageService: StorageBucketService,
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

      // storage: multer({
      //   ...this.storageService.getSavePhotoParams(),

      //   contentType: multer.AUTO_CONTENT_TYPE,

      //   metadata(req, file, cb) {
      //     cb(null, { fieldName: file.fieldname });
      //   },

      //   key: async (req, file, cb) => {
      //     try {
      //       const fileKey = await this.stringGeneratorService
      //         .setExists(this.uploadOptions.nameExists)
      //         .generate(
      //           Photo.NAME_CONFIG,
      //           true,
      //           `${StorageBucketService.PHOTO_PATH}${this.uploadOptions.namePrefix}`,
      //           extname(file.originalname),
      //         );

      //       cb(null, fileKey);
      //     } catch (error) {
      //       cb(error, null);
      //     }
      //   },
      // }),
    };
  }
}
