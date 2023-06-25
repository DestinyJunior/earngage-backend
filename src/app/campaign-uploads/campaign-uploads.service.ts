import { Injectable } from '@nestjs/common';
import { CreateCampaignUploadDto } from './dto/create-campaign-upload.dto';
import { UpdateCampaignUploadDto } from './dto/update-campaign-upload.dto';

@Injectable()
export class CampaignUploadsService {
  create(createCampaignUploadDto: CreateCampaignUploadDto) {
    return 'This action adds a new campaignUpload';
  }

  findAll() {
    return `This action returns all campaignUploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaignUpload`;
  }

  update(id: number, updateCampaignUploadDto: UpdateCampaignUploadDto) {
    return `This action updates a #${id} campaignUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaignUpload`;
  }
}
