import { Allow } from 'class-validator';
import { Types as MongoTypes } from 'mongoose';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';

export class CreateCampaignUploadDto {
  @Allow()
  campaign?: MongoTypes.ObjectId;

  @Allow()
  campaignVideo?: MediaFile;

  @Allow()
  campaignCover?: MediaFile;

  @Allow()
  sampleVideos?: MongoTypes.ObjectId;
}
