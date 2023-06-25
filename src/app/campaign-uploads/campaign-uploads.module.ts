import { Module } from '@nestjs/common';
import { CampaignUploadsService } from './campaign-uploads.service';
import { CampaignUploadsController } from './campaign-uploads.controller';

@Module({
  controllers: [CampaignUploadsController],
  providers: [CampaignUploadsService]
})
export class CampaignUploadsModule {}
