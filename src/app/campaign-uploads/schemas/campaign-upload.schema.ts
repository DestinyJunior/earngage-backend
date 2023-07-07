import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';

export type CampaignUploadDocument = CampaignUpload & Document;

@Schema({ timestamps: true })
export class CampaignUpload {
  @Prop({ required: true, ref: MediaFile.name, type: MongoTypes.ObjectId })
  campaignVideo: MongoTypes.ObjectId;

  @Prop({ required: true, ref: MediaFile.name, type: MongoTypes.ObjectId })
  campaignCover: MongoTypes.ObjectId;

  @Prop({
    required: true,
    ref: MediaFile.name,
    type: [MongoTypes.ObjectId],
  })
  sampleVideos: [MongoTypes.ObjectId];
}

export const CampaignUploadSchema =
  SchemaFactory.createForClass(CampaignUpload);
