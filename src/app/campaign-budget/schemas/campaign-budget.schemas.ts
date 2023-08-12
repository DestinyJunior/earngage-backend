import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CampaignBudgetDocument = CampaignBudget & Document;

class EstimationData {
  @Prop({ required: true })
  min: number;

  @Prop({ required: true })
  max: number;
}

@Schema({ timestamps: true })
export class CampaignBudget {
  @Prop({ required: true })
  budgetAmount: number;

  @Prop({ required: true, type: EstimationData })
  estimatedReach: EstimationData;

  @Prop({ required: true, type: EstimationData })
  estimatedViews: EstimationData;
}

export const CampaignBudgetSchema =
  SchemaFactory.createForClass(CampaignBudget);
