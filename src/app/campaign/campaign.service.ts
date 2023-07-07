import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CampaignRepository } from './campaign.repository';
import { CAMPAIGN_STATUS } from './schemas/campaign.schema';
import { User } from '../user/schemas/user.schema';
import { Types as MongoTypes } from 'mongoose';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignRepository: CampaignRepository) {}
  create(createCampaignDto: CreateCampaignDto, user: User) {
    return this.campaignRepository.create({
      ...createCampaignDto,
      creator: new MongoTypes.ObjectId(user.id),
      status: CAMPAIGN_STATUS.DRAFT,
    });
  }

  findAll() {
    return `This action returns all campaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
