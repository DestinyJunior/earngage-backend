import { Module } from '@nestjs/common';
import { CampaignBudgetService } from './campaign-budget.service';
import { CampaignBudgetController } from './campaign-budget.controller';

@Module({
  controllers: [CampaignBudgetController],
  providers: [CampaignBudgetService]
})
export class CampaignBudgetModule {}
