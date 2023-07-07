import { Injectable } from '@nestjs/common';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CampaignRepository {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  create(createCampaignDto: Campaign) {
    return this.campaignModel.create(createCampaignDto);
  }

  findAll() {
    return this.campaignModel.find();
  }

  findOne() {
    return this.campaignModel.findOne();
  }

  update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.campaignModel.findByIdAndUpdate(id, updateCampaignDto);
  }

  remove(id: string) {
    // clear upload files
    return this.campaignModel.findByIdAndDelete(id);
  }
}
