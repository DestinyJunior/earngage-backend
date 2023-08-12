import { Module } from '@nestjs/common';
import { CampaignUploadsRepository } from './campaign-uploads.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionModule } from '../permission/permission.module';
import {
  CampaignUpload,
  CampaignUploadSchema,
} from './schemas/campaign-upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignUpload.name, schema: CampaignUploadSchema },
    ]),
    PermissionModule,
  ],
  providers: [CampaignUploadsRepository],
  exports: [CampaignUploadsRepository],
})
export class CampaignUploadsModule {}
