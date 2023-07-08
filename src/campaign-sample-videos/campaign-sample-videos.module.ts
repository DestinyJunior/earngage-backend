import { Module } from '@nestjs/common';
import { CampaignSampleVideosRepository } from './campaign-sample-videos.repository';
import { FileModule } from 'src/app/file-upload/file.module';
import {
  CampaignSampleVideos,
  CampaignSampleVideosSchema,
} from './schemas/sample-videos.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionModule } from 'src/app/permission/permission.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
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
      { name: CampaignSampleVideos.name, schema: CampaignSampleVideosSchema },
    ]),
    PermissionModule,
  ],
  providers: [CampaignSampleVideosRepository],
  exports: [CampaignSampleVideosRepository],
})
export class CampaignSampleVideosModule {}
