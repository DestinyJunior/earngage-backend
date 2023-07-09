import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
import { CampaignSampleVideos } from '../../campaign-sample-videos/schemas/sample-videos.schema';

export type CampaignUploadDocument = CampaignUpload & Document;

@Schema({ timestamps: true })
export class CampaignUpload {
  static readonly FILE_PATH = 'uploads/';

  id: string;

  @Prop({
    required: true,
    ref: 'Campaign',
    type: MongoTypes.ObjectId,
    unique: true,
  })
  campaign: MongoTypes.ObjectId;

  @Prop({ required: false, type: MediaFile })
  campaignVideo: MediaFile;

  @Prop({ required: false, type: MediaFile })
  campaignCover: MediaFile;

  @Prop({
    required: false,
    ref: CampaignSampleVideos.name,
    type: MongoTypes.ObjectId,
  })
  sampleVideos: MongoTypes.ObjectId;
}

export const CampaignUploadSchema =
  SchemaFactory.createForClass(CampaignUpload);
