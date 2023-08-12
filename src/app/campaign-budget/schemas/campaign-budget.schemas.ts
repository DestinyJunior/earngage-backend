import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';

export type CampaignBudgetDocument = CampaignBudget & Document;

class EstimationData {
  @Prop({ type: Number })
  min: number;

  @Prop({ type: Number })
  max: number;
}

@Schema({ timestamps: true })
export class CampaignBudget {
  @Prop({
    required: true,
    ref: 'Campaign',
    type: MongoTypes.ObjectId,
    unique: true,
  })
  campaign: MongoTypes.ObjectId;

  @Prop({ type: Number })
  budgetAmount: number;

  @Prop({ type: EstimationData })
  estimatedReach: EstimationData;

  @Prop({ type: EstimationData })
  estimatedViews: EstimationData;
}

export const CampaignBudgetSchema =
  SchemaFactory.createForClass(CampaignBudget);
