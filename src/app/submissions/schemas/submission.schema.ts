import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Campaign } from 'src/app/campaign/schemas/campaign.schema';
import { Types as MongoTypes } from 'mongoose';
import { User } from 'src/app/user/schemas/user.schema';

export type SubmissionDocument = Submission & Document;

export class SubmissionImpressionsData {
  @Prop({ type: Boolean, default: false })
  viewed?: boolean;

  @Prop({ type: Boolean, default: false })
  watched?: boolean;
}

@Schema({ timestamps: true })
export class Submission {
  //   static readonly FILE_PATH = 'submissions/';

  @Prop({
    required: true,
    ref: Campaign.name,
    type: MongoTypes.ObjectId,
  })
  campaign: MongoTypes.ObjectId;

  @Prop({
    required: true,
    ref: User.name,
    type: MongoTypes.ObjectId,
  })
  user: MongoTypes.ObjectId;

  @Prop({
    required: true,
    ref: User.name,
    type: MongoTypes.ObjectId,
  })
  creator: MongoTypes.ObjectId;

  @Prop()
  rewardAmount?: number;

  @Prop({ type: Boolean, default: false })
  bookmarked: boolean;

  @Prop({ required: false, type: SubmissionImpressionsData })
  impressions?: SubmissionImpressionsData;
}

export class SubmissionWithId extends Submission {
  _id: MongoTypes.ObjectId;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
