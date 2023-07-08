import { Module } from '@nestjs/common';
import { CampaignUploadsRepository } from './campaign-uploads.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampaignSampleVideos,
  CampaignSampleVideosSchema,
} from '../../campaign-sample-videos/schemas/sample-videos.schema';
import { PermissionModule } from '../permission/permission.module';
import {
  CampaignUpload,
  CampaignUploadSchema,
} from './schemas/campaign-upload.schema';
import { FileModule } from '../file-upload/file.module';

@Module({
  imports: [
    FileModule.registerAsync({
      import: [CampaignUploadsModule],
      inject: [CampaignUploadsRepository],
      useFactory: (uploadRepository: CampaignUploadsRepository) => ({
        namePrefix: CampaignUpload.FILE_PATH,
        nameExists:
          uploadRepository.existsUploadByPhotoName.bind(uploadRepository),
      }),
    }),
    MongooseModule.forFeature([
      { name: CampaignUpload.name, schema: CampaignUploadSchema },
    ]),
    PermissionModule,
  ],
  providers: [CampaignUploadsRepository],
  exports: [CampaignUploadsRepository],
})
export class CampaignUploadsModule {}
