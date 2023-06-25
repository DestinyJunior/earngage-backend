import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/app/user/schemas/user.schema';

export type CampaignDocument = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true, ref: User.name, type: mongoose.Types.ObjectId })
  user: mongoose.Types.ObjectId;

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
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
