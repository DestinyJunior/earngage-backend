import { S3, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service for managing files in the storage bucket.
 */
@Injectable()
export class S3StorageBucketService {
  static readonly PHOTO_PATH = 'images/';

  constructor(private readonly configService: ConfigService) {}

  getSavePhotoParams() {
    return {
      s3: new S3Client({
        region: this.configService.get('AWS_S3_BUCKET_REGION'),
      }),
      bucket: this.configService.get('AWS_S3_BUCKET'),
    };
  }

  deletePhoto(key: string) {
    const s3 = new S3({
      region: this.configService.get('AWS_S3_BUCKET_REGION'),
    });

    return s3.deleteObject({
      Key: key,
      Bucket: this.configService.get('AWS_S3_BUCKET'),
    });
  }

  deletePhotos(keys: string[]) {
    const s3 = new S3({
      region: this.configService.get('AWS_S3_BUCKET_REGION'),
    });

    return s3.deleteObjects({
      Delete: { Objects: keys.map((Key) => ({ Key })) },
      Bucket: this.configService.get('AWS_S3_BUCKET'),
    });
  }
}
