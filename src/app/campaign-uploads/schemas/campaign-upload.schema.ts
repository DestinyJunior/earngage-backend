import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';

export type CampaignUploadDocument = CampaignUpload & Document;

@Schema({ timestamps: true })
export class CampaignUpload {
  @Prop({ required: true, ref: MediaFile.name, type: mongoose.Types.ObjectId })
  campaignVideo: mongoose.Types.ObjectId;

  @Prop({ required: true, ref: MediaFile.name, type: mongoose.Types.ObjectId })
  campaignCover: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    ref: MediaFile.name,
    type: [mongoose.Types.ObjectId],
  })
  sampleVideos: [mongoose.Types.ObjectId];
}

export const CampaignUploadSchema =
  SchemaFactory.createForClass(CampaignUpload);
