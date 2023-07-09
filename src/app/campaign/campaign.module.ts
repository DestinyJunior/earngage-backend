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
import { CampaignSampleVideosModule } from 'src/app/campaign-sample-videos/campaign-sample-videos.module';
import { ConfigProviderModule } from 'src/provider/config.provider';
import { FileModule } from '../file-upload/file.module';
import { CampaignUploadsRepository } from '../campaign-uploads/campaign-uploads.repository';
import { CampaignUpload } from '../campaign-uploads/schemas/campaign-upload.schema';
import { CampaignSampleVideosRepository } from '../campaign-sample-videos/campaign-sample-videos.repository';
import { CampaignSampleVideos } from '../campaign-sample-videos/schemas/sample-videos.schema';

@Module({
  imports: [
    ConfigProviderModule,
    PermissionModule,
    UserModule,
    CampaignUploadsModule,
    CampaignSampleVideosModule,
    FileModule.registerAsync({
      import: [CampaignUploadsModule],
      inject: [CampaignUploadsRepository],
      useFactory: (uploadRepository: CampaignUploadsRepository) => ({
        namePrefix: CampaignUpload.FILE_PATH,
        nameExists:
          uploadRepository.existsUploadByPhotoName.bind(uploadRepository),
      }),
    }),
    FileModule.registerAsync({
      import: [CampaignSampleVideosModule],
      inject: [CampaignSampleVideosRepository],
      useFactory: (sampleVideoRepository: CampaignSampleVideosRepository) => ({
        namePrefix: CampaignSampleVideos.FILE_PATH,
        nameExists: sampleVideoRepository.existsSampleVideosByPhotoName.bind(
          sampleVideoRepository,
        ),
      }),
    }),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
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
