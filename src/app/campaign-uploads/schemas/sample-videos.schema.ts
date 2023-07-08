import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { Campaign } from 'src/app/campaign/schemas/campaign.schema';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';

export type CampaignSampleVideosDocument = CampaignSampleVideos & Document;

@Schema({ timestamps: true })
export class CampaignSampleVideos {
  @Prop({
    required: true,
    ref: Campaign.name,
    type: MongoTypes.ObjectId,
    unique: true,
  })
  campaign: MongoTypes.ObjectId;

  @Prop({ required: true, type: MediaFile })
  sampleOne: MediaFile;

  @Prop({ required: false, type: MediaFile })
  sampleTwo?: MediaFile;

  @Prop({
    required: false,
    type: MediaFile,
  })
  sampleThree?: MediaFile;

  @Prop({
    required: false,
    type: MediaFile,
  })
  sampleFour?: MediaFile;

  @Prop({
    required: false,
    type: MediaFile,
  })
  sampleFive?: MediaFile;
}

export const CampaignSampleVideosSchema =
  SchemaFactory.createForClass(CampaignSampleVideos);
