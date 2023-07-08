import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { CampaignRepository } from './campaign.repository';
import { PermissionModule } from '../permission/permission.module';
import { UserModule } from '../user/user.module';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { IsUniqueCampaignTitlePipe } from './pipes/is-unique-title.pipe';
import { CampaignUploadsModule } from '../campaign-uploads/campaign-uploads.module';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';
import { CampaignSampleVideosModule } from 'src/campaign-sample-videos/campaign-sample-videos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
    PermissionModule,
    UserModule,
    CampaignUploadsModule,
    CampaignSampleVideosModule,
  ],
  controllers: [CampaignController],
  providers: [
    EntityMapperService,
    CampaignService,
    CampaignRepository,
    IsUniqueCampaignTitlePipe,
    S3StorageBucketService,
  ],
})
export class CampaignModule {}
