import { Injectable } from '@nestjs/common';
import { CreateCampaignUploadDto } from './dto/create-campaign-upload.dto';
import {
  CampaignUpload,
  CampaignUploadDocument,
} from './schemas/campaign-upload.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { CampaignSampleVideos } from '../../campaign-sample-videos/schemas/sample-videos.schema';
import { MgFilterQuery } from 'src/types/mongoose.types';

@Injectable()
export class CampaignUploadsRepository {
  constructor(
    @InjectModel(CampaignUpload.name)
    private uploadModel: Model<CampaignUploadDocument>,
  ) {}

  createUploads(createCampaignUploadDto: CreateCampaignUploadDto) {
    return this.uploadModel.create(createCampaignUploadDto);
  }

  findAllUploads() {
    return this.uploadModel.find().populate('sampleVideos');
  }

  findByUploadId(id: string) {
    return this.uploadModel.findById(id).populate('sampleVideos');
  }

  findBySampleVideoId(id: string) {
    return this.uploadModel.findById(id).populate('sampleVideos');
  }

  findOneByUpload(params: MgFilterQuery<CampaignSampleVideos>) {
    return this.uploadModel.findOne(params);
  }

  updateUploads(
    params: MgFilterQuery<CampaignUpload>,
    payload: UpdateQuery<CampaignUpload>,
  ) {
    return this.uploadModel.findOneAndUpdate(params, payload);
  }

  /**
   * Checks if a campaign uploads entity with a photo name exists.
   */
  async existsUploadByPhotoName(photoName: string) {
    const user = await this.uploadModel
      .findOne({ 'campaignCover.name': photoName })
      .exec();
    return user !== null;
  }
}
