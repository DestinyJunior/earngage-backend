import { Allow } from 'class-validator';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
import { Types as MongoTypes } from 'mongoose';

export class CreateCampaignSampleVideosDto {
  @Allow()
  campaign?: MongoTypes.ObjectId;

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
