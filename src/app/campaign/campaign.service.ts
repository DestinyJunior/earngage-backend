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
      slug: createCampaignDto.title.toLowerCase().split(' ').join('-'),
    });
  }

  findAll() {
    return this.campaignRepository.findAll();
  }

  findOne(id: string) {
    return this.campaignRepository.findOne(id);
  }

  updateCampaignDetails(id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.campaignRepository.update(id, updateCampaignDto);
  }

  remove(id: string) {
    return this.campaignRepository.remove(id);
  }
}
