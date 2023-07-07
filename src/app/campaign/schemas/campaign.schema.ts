import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
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

  @Prop({ required: true })
  title: string;

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

  @Prop({
    required: true,
    default: CAMPAIGN_STATUS.DRAFT,
    enum: CAMPAIGN_STATUS,
  })
  status: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
