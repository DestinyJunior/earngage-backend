import { Injectable } from '@nestjs/common';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as MongoTypes, UpdateQuery } from 'mongoose';
import { MgFilterQuery } from 'src/types/mongoose.types';
import { CampaignSampleVideos } from '../campaign-sample-videos/schemas/sample-videos.schema';

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

  findAll(params?: MgFilterQuery<Campaign>) {
    return this.campaignModel
      .find(params)
      .populate([
        {
          path: 'uploads',
          populate: { path: 'sampleVideos', model: CampaignSampleVideos.name },
        },
        {
          path: 'videos',
        },
        { path: 'budget' },
      ])
      .sort('-createdAt');
  }

  findOne(params: MgFilterQuery<Campaign>) {
    return this.campaignModel.findOne(params);
  }

  findById(id: MongoTypes.ObjectId) {
    return this.campaignModel.findById(id).populate([
      {
        path: 'uploads',
        populate: { path: 'sampleVideos', model: CampaignSampleVideos.name },
      },
      {
        path: 'videos',
      },
      { path: 'budget' },
    ]);
  }

  update(id: MongoTypes.ObjectId, payload: UpdateQuery<Campaign>) {
    return this.campaignModel.findByIdAndUpdate(id, payload);
  }

  delete(id: MongoTypes.ObjectId) {
    // clear upload files
    return this.campaignModel.findByIdAndDelete(id);
  }
}
