import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignBudgetDto } from './create-campaign-budget.dto';

export class UpdateCampaignBudgetDto extends PartialType(CreateCampaignBudgetDto) {}
