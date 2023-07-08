import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { Campaign } from 'src/app/campaign/schemas/campaign.schema';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
import { CampaignSampleVideos } from './sample-videos.schema';

export type CampaignUploadDocument = CampaignUpload & Document;

@Schema({ timestamps: true })
export class CampaignUpload {
  @Prop({
    required: true,
    ref: Campaign.name,
    type: MongoTypes.ObjectId,
    unique: true,
  })
  campaign: MongoTypes.ObjectId;

  @Prop({ required: true, type: MediaFile })
  campaignVideo: MediaFile;

  @Prop({ required: true, type: MediaFile })
  campaignCover: MediaFile;

  @Prop({
    required: true,
    ref: CampaignSampleVideos.name,
    type: MongoTypes.ObjectId,
  })
  sampleVideos: MongoTypes.ObjectId;
}

export const CampaignUploadSchema =
  SchemaFactory.createForClass(CampaignUpload);
