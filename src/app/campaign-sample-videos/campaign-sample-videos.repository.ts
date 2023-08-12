import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import {
  CampaignSampleVideos,
  CampaignSampleVideosDocument,
} from './schemas/sample-videos.schema';
import { CreateCampaignUploadDto } from 'src/app/campaign-uploads/dto/create-campaign-upload.dto';
import { MgFilterQuery } from 'src/types/mongoose.types';

@Injectable()
export class CampaignSampleVideosRepository {
  constructor(
    @InjectModel(CampaignSampleVideos.name)
    private sampleVideosModel: Model<CampaignSampleVideosDocument>,
  ) {}

  createSampleVideos(createCampaignUploadDto: CreateCampaignUploadDto) {
    return this.sampleVideosModel.create(createCampaignUploadDto);
  }

  findOneBySample(params: MgFilterQuery<CampaignSampleVideos>) {
    return this.sampleVideosModel.findOne(params);
  }

  updateSampleVideos(
    params: MgFilterQuery<CampaignSampleVideos>,
    payload: UpdateQuery<CampaignSampleVideos>,
  ) {
    return this.sampleVideosModel.findOneAndUpdate(params, payload);
  }

  /**
   * Checks if a campaign uploads entity with a photo name exists.
   */
  async existsSampleVideosByPhotoName(photoName: string) {
    const user = await this.sampleVideosModel
      .findOne({ 'sampleOne.name': photoName })
      .exec();
    return user !== null;
  }
}
