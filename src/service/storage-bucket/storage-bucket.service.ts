import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import { StorageFile } from './storage.file';

/**
 * Service for managing files in the storage bucket.
 */
@Injectable()
export class StorageBucketService {
  static readonly FILE_PATH = 'files/';
  static readonly PHOTO_PATH = StorageBucketService.FILE_PATH + 'images/';

  private storage: Storage;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.get('GOOGLE_CLOUD_PROJECT'),
      credentials: {
        client_email: this.configService.get('GOOGLE_CLIENT_EMAIL'),
        private_key: this.configService.get('CLOUD_PRIVATE_KEY'),
      },
    });

    this.bucket = this.configService.get('CLOUD_BUCKET');
  }

  async saveFile(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[],
  ) {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream({
      metadata: {
        contentType: contentType,
        'Cache-Control': 'no-store',
      },
    });

    stream.on('finish', async () => {
      await file.makePublic();

      return await file.setMetadata({
        metadata: object,
      });
    });

    stream.end(media);

    const publicUrl = `https://storage.googleapis.com/${this.bucket}/${file.name}`;

    return publicUrl;
  }

  async deleteFile(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async getFile(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [metadata] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(
      Object.entries(metadata || {}),
    );
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }
}
