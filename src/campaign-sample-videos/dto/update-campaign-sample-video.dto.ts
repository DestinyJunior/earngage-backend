import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignSampleVideosDto } from './create-campaign-sample-video.dto';

export class UpdateCampaignSampleVideoDto extends PartialType(
  CreateCampaignSampleVideosDto,
) {}
