import { Injectable } from '@nestjs/common';
import { CreateCampaignBudgetDto } from './dto/create-campaign-budget.dto';
import { UpdateCampaignBudgetDto } from './dto/update-campaign-budget.dto';

@Injectable()
export class CampaignBudgetService {
  create(createCampaignBudgetDto: CreateCampaignBudgetDto) {
    return 'This action adds a new campaignBudget';
  }

  findAll() {
    return `This action returns all campaignBudget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaignBudget`;
  }

  update(id: number, updateCampaignBudgetDto: UpdateCampaignBudgetDto) {
    return `This action updates a #${id} campaignBudget`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaignBudget`;
  }
}
