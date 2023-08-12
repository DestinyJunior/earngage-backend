import { Injectable } from '@nestjs/common';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongoTypes, UpdateQuery } from 'mongoose';
import { MgFilterQuery } from 'src/types/mongoose.types';

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

  findOne(params: MgFilterQuery<Campaign>) {
    return this.campaignModel.findOne(params);
  }

  findById(id: MongoTypes.ObjectId) {
    return this.campaignModel.findById(id);
  }

  update(id: MongoTypes.ObjectId, payload: UpdateQuery<Campaign>) {
    return this.campaignModel.findByIdAndUpdate(id, payload);
  }

  remove(id: string) {
    // clear upload files
    return this.campaignModel.findByIdAndDelete(id);
  }
}
