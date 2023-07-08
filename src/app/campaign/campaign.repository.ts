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

  async existsByTitle(title: string) {
    const campaign = await this.campaignModel.findOne({ title }).exec();
    return campaign !== null;
  }

  create(createCampaignDto: Campaign) {
    return this.campaignModel.create(createCampaignDto);
  }

  findAll() {
    return this.campaignModel.find();
  }

  findOne(id: string) {
    return this.campaignModel.findById(id);
  }

  update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.campaignModel.findByIdAndUpdate(id, updateCampaignDto);
  }

  remove(id: string) {
    // clear upload files
    return this.campaignModel.findByIdAndDelete(id);
  }
}
