import { Module } from '@nestjs/common';
import { CampaignUploadsRepository } from './campaign-uploads.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampaignSampleVideos,
  CampaignSampleVideosSchema,
} from './schemas/sample-videos.schema';
import { PermissionModule } from '../permission/permission.module';
import {
  CampaignUpload,
  CampaignUploadSchema,
} from './schemas/campaign-upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignUpload.name, schema: CampaignUploadSchema },
      { name: CampaignSampleVideos.name, schema: CampaignSampleVideosSchema },
    ]),
    PermissionModule,
  ],
  controllers: [],
  providers: [CampaignUploadsRepository],
})
export class CampaignUploadsModule {}
