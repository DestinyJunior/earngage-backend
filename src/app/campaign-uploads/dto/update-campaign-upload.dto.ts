import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignUploadDto } from './create-campaign-upload.dto';

export class UpdateCampaignUploadDto extends PartialType(
  CreateCampaignUploadDto,
) {}
