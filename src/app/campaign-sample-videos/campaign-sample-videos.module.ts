import { Module } from '@nestjs/common';
import { CampaignSampleVideosRepository } from './campaign-sample-videos.repository';
import {
  CampaignSampleVideos,
  CampaignSampleVideosSchema,
} from './schemas/sample-videos.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionModule } from 'src/app/permission/permission.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignSampleVideos.name, schema: CampaignSampleVideosSchema },
    ]),
    PermissionModule,
  ],
  providers: [CampaignSampleVideosRepository],
  exports: [CampaignSampleVideosRepository],
})
export class CampaignSampleVideosModule {}
