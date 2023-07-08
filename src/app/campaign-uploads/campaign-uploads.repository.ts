import { Injectable } from '@nestjs/common';
import { CreateCampaignUploadDto } from './dto/create-campaign-upload.dto';
import {
  CampaignUpload,
  CampaignUploadDocument,
} from './schemas/campaign-upload.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import {
  CampaignSampleVideos,
  CampaignSampleVideosDocument,
} from './schemas/sample-videos.schema';
import { MgFilterQuery } from 'src/types/mongoose.types';

@Injectable()
export class CampaignUploadsRepository {
  constructor(
    @InjectModel(CampaignUpload.name)
    private uploadModel: Model<CampaignUploadDocument>,
    @InjectModel(CampaignSampleVideos.name)
    private sampleVideosModel: Model<CampaignSampleVideosDocument>,
  ) {}

  createUploads(createCampaignUploadDto: CreateCampaignUploadDto) {
    return this.uploadModel.create(createCampaignUploadDto);
  }

  createSampleVideos(createCampaignUploadDto: CreateCampaignUploadDto) {
    return this.sampleVideosModel.create(createCampaignUploadDto);
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
    return this.sampleVideosModel.findById(params);
  }

  updateUploads(
    params: MgFilterQuery<CampaignUpload>,
    payload: UpdateQuery<CampaignUpload>,
  ) {
    return this.uploadModel.findOneAndUpdate(params, payload);
  }

  updateSampleVideos(
    params: MgFilterQuery<CampaignSampleVideos>,
    payload: UpdateQuery<CampaignSampleVideos>,
  ) {
    return this.sampleVideosModel.findOneAndUpdate(params, payload);
  }
}
