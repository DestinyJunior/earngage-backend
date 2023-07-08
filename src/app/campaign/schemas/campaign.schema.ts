import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { CampaignBudget } from 'src/app/campaign-budget/schemas/campaign-budget.schemas';
import { CampaignUpload } from 'src/app/campaign-uploads/schemas/campaign-upload.schema';
import { CampaignSampleVideos } from 'src/campaign-sample-videos/schemas/sample-videos.schema';
import { User } from 'src/app/user/schemas/user.schema';

export type CampaignDocument = Campaign & Document;

export enum CAMPAIGN_STATUS {
  PUBLISHED = 'Published',
  DRAFT = 'Draft',
  CLOSED = 'Closed',
}

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true, ref: User.name, type: MongoTypes.ObjectId })
  creator: MongoTypes.ObjectId;

  @Prop({ required: true, unique: true, trim: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  subTitle: string;

  @Prop({ required: true })
  challengeType: string;

  @Prop({ required: true })
  campaignGoal: string;

  @Prop({ required: true })
  instructions: string;

  @Prop({ required: true })
  medium: string;

  @Prop({ required: false, default: false })
  isPinned?: boolean;

  @Prop({
    required: true,
    default: CAMPAIGN_STATUS.DRAFT,
    enum: CAMPAIGN_STATUS,
  })
  status: string;

  @Prop({
    required: false,
    ref: CampaignUpload.name,
    type: MongoTypes.ObjectId,
  })
  uploads?: MongoTypes.ObjectId;

  @Prop({
    required: false,
    ref: CampaignSampleVideos.name,
    type: MongoTypes.ObjectId,
  })
  videos?: MongoTypes.ObjectId;

  @Prop({
    required: false,
    ref: CampaignBudget.name,
    type: MongoTypes.ObjectId,
  })
  budget?: MongoTypes.ObjectId;
}

export class CampaignWithId extends Campaign {
  _id: MongoTypes.ObjectId;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
