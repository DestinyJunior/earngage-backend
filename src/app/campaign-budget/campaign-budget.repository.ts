import { Injectable } from '@nestjs/common';
import { CreateCampaignBudgetDto } from './dto/create-campaign-budget.dto';
import {
  CampaignBudget,
  CampaignBudgetDocument,
} from './schemas/campaign-budget.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { MgFilterQuery } from 'src/types/mongoose.types';

@Injectable()
export class CampaignBudgetRepository {
  constructor(
    @InjectModel(CampaignBudget.name)
    private budgetModel: Model<CampaignBudgetDocument>,
  ) {}

  // create(createCampaignBudgetDto: CreateCampaignBudgetDto) {
  //   return this.budgetModel.create(createCampaignBudgetDto);
  // }

  createWithCampaign(
    createCampaignBudgetDto: Pick<CampaignBudget, 'campaign'>,
  ) {
    return this.budgetModel.create(createCampaignBudgetDto);
  }

  findOne(params: MgFilterQuery<CampaignBudget>) {
    return this.budgetModel.findOne(params);
  }

  updateOne(
    params: MgFilterQuery<CampaignBudget>,
    payload: UpdateQuery<CampaignBudget>,
  ) {
    return this.budgetModel.findOneAndUpdate(params, payload);
  }
}
