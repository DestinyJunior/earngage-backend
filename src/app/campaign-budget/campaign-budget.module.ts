import { Module } from '@nestjs/common';
import { CampaignBudgetRepository } from './campaign-budget.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampaignBudget,
  CampaignBudgetSchema,
} from './schemas/campaign-budget.schemas';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignBudget.name, schema: CampaignBudgetSchema },
    ]),
    PermissionModule,
  ],
  providers: [CampaignBudgetRepository],
  exports: [CampaignBudgetRepository],
})
export class CampaignBudgetModule {}
