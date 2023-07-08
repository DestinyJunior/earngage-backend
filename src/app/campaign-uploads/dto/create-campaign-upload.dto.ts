import { Allow } from 'class-validator';
import { Types } from 'mongoose';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';

export class CreateCampaignUploadDto {
  @Allow()
  campaignVideo: MediaFile;

  @Allow()
  campaignCover: MediaFile;

  @Allow()
  sampleVideos: Types.ObjectId;
}

export class CreateCampaignSampleVideosDto {
  @Allow()
  sampleOne: MediaFile;

  @Allow()
  sampleTwo: MediaFile;

  @Allow()
  sampleThree: MediaFile;

  @Allow()
  sampleFour?: MediaFile;

  @Allow()
  sampleFive?: MediaFile;
}
