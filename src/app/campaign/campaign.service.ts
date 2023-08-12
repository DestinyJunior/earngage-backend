import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CampaignRepository } from './campaign.repository';
import {
  CAMPAIGN_STATUS,
  Campaign,
  CampaignWithId,
} from './schemas/campaign.schema';
import { User } from '../user/schemas/user.schema';
import { Types as MongoTypes } from 'mongoose';
import { CampaignUploadsRepository } from '../campaign-uploads/campaign-uploads.repository';
import { UpdateUploadFilesDto } from '../campaign-uploads/dto/create-upload-files.dto';
import { CreateCampaignUploadDto } from '../campaign-uploads/dto/create-campaign-upload.dto';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';
import { MgFilterQuery } from 'src/types/mongoose.types';
import { CampaignSampleVideosRepository } from 'src/app/campaign-sample-videos/campaign-sample-videos.repository';
import { CreateCampaignSampleVideosDto } from 'src/app/campaign-sample-videos/dto/create-campaign-sample-video.dto';
import { UpdateSampleVideoFilesDto } from 'src/app/campaign-sample-videos/dto/create-sample-videos-files.dto';

@Injectable()
export class CampaignService {
  constructor(
    private readonly campaignRepository: CampaignRepository,
    private readonly uploadsRepository: CampaignUploadsRepository,
    private readonly sampleVideosRepository: CampaignSampleVideosRepository,
    private readonly entityMapperService: EntityMapperService,
    private readonly awsS3StorageBucketService: S3StorageBucketService,
  ) {}

  create(createCampaignDto: CreateCampaignDto, user: User) {
    return this.campaignRepository.create({
      ...createCampaignDto,
      creator: new MongoTypes.ObjectId(user.id),
      status: CAMPAIGN_STATUS.DRAFT,
      slug: createCampaignDto.title.toLowerCase().split(' ').join('-'),
    });
  }

  async addUploads(
    campaign: CampaignWithId,
    createUploadDtos: CreateCampaignUploadDto,
    uploadsDto: UpdateUploadFilesDto,
  ) {
    const deleteFiles = [];

    let getUploads = await this.uploadsRepository.findOneByUpload({
      campaign: campaign._id,
    });

    if (!getUploads) {
      getUploads = await this.uploadsRepository.createUploads({
        campaign: campaign._id,
      });
    }

    const oldCampaignCoverPhotoKey = getUploads.campaignCover?.name;
    const oldCampaignVideoKey = getUploads.campaignCover?.name;

    const campaignCoverPhotoUploaded =
      uploadsDto?.campaignCover !== undefined &&
      uploadsDto.campaignCover.length > 0;

    const campaignVideoUploaded =
      uploadsDto?.campaignVideo !== undefined &&
      uploadsDto.campaignVideo.length > 0;

    if (campaignCoverPhotoUploaded) {
      createUploadDtos.campaignCover =
        this.entityMapperService.multerFileToPhoto(uploadsDto.campaignCover[0]);
    }

    if (campaignVideoUploaded) {
      createUploadDtos.campaignVideo =
        this.entityMapperService.multerFileToPhoto(uploadsDto.campaignVideo[0]);
    }

    await this.uploadsRepository.updateUploads(
      { campaign: campaign._id },
      createUploadDtos,
    );

    if (!campaign?.uploads) {
      await this.campaignRepository.update(campaign._id, {
        uploads: getUploads._id,
      });
    }

    if (
      campaignCoverPhotoUploaded !== undefined &&
      oldCampaignCoverPhotoKey !== undefined
    ) {
      deleteFiles.push(
        this.awsS3StorageBucketService.deleteFile(oldCampaignCoverPhotoKey),
      );
    }

    if (
      campaignVideoUploaded !== undefined &&
      oldCampaignVideoKey !== undefined
    ) {
      deleteFiles.push(
        this.awsS3StorageBucketService.deleteFile(oldCampaignVideoKey),
      );
    }

    await Promise.all(deleteFiles);

    return await this.campaignRepository.findById(campaign._id);
  }

  async addSampleVideos(
    campaign: CampaignWithId,
    createSampleVideosDto: CreateCampaignSampleVideosDto,
    sampleVideosDto: UpdateSampleVideoFilesDto,
  ) {
    const deleteFiles = [];

    let getSampleVids = await this.sampleVideosRepository.findOneBySample({
      campaign: campaign._id,
    });

    if (!getSampleVids) {
      getSampleVids = await this.sampleVideosRepository.createSampleVideos({
        campaign: campaign._id,
      });
    }

    const oldSampleOneKey = getSampleVids.sampleOne?.name;
    const oldSampleTwoKey = getSampleVids.sampleTwo?.name;
    const oldSampleThreeKey = getSampleVids.sampleThree?.name;
    const oldSampleFourKey = getSampleVids.sampleFive?.name;
    const oldSampleFiveKey = getSampleVids.sampleFive?.name;

    const sampleOneUploaded =
      sampleVideosDto?.sampleOne !== undefined &&
      sampleVideosDto.sampleOne.length > 0;
    const sampleTwoUploaded =
      sampleVideosDto?.sampleTwo !== undefined &&
      sampleVideosDto.sampleTwo.length > 0;
    const sampleThreeUploaded =
      sampleVideosDto?.sampleThree !== undefined &&
      sampleVideosDto.sampleThree.length > 0;
    const sampleFourUploaded =
      sampleVideosDto?.sampleFour !== undefined &&
      sampleVideosDto.sampleFour.length > 0;
    const sampleFiveUploaded =
      sampleVideosDto?.sampleFive !== undefined &&
      sampleVideosDto.sampleFive.length > 0;

    if (sampleOneUploaded) {
      createSampleVideosDto.sampleOne =
        this.entityMapperService.multerFileToPhoto(
          sampleVideosDto.sampleOne[0],
        );
    }

    if (sampleTwoUploaded) {
      createSampleVideosDto.sampleTwo =
        this.entityMapperService.multerFileToPhoto(
          sampleVideosDto.sampleTwo[0],
        );
    }

    if (sampleThreeUploaded) {
      createSampleVideosDto.sampleThree =
        this.entityMapperService.multerFileToPhoto(
          sampleVideosDto.sampleThree[0],
        );
    }

    if (sampleFourUploaded) {
      createSampleVideosDto.sampleFour =
        this.entityMapperService.multerFileToPhoto(
          sampleVideosDto.sampleFour[0],
        );
    }

    if (sampleFiveUploaded) {
      createSampleVideosDto.sampleFive =
        this.entityMapperService.multerFileToPhoto(
          sampleVideosDto.sampleFive[0],
        );
    }

    await this.sampleVideosRepository.updateSampleVideos(
      { campaign: campaign._id },
      createSampleVideosDto,
    );

    await this.uploadsRepository.updateUploads(
      { campaign: campaign._id },
      { sampleVideos: getSampleVids._id },
    );

    if (sampleOneUploaded !== undefined && oldSampleOneKey !== undefined) {
      deleteFiles.push(
        this.awsS3StorageBucketService.deleteFile(oldSampleOneKey),
      );
    }

    if (sampleTwoUploaded !== undefined && oldSampleTwoKey !== undefined) {
      deleteFiles.push(
        this.awsS3StorageBucketService.deleteFile(oldSampleTwoKey),
      );
    }

    if (sampleThreeUploaded !== undefined && oldSampleThreeKey !== undefined) {
      deleteFiles.push(
        this.awsS3StorageBucketService.deleteFile(oldSampleThreeKey),
      );
    }

    if (sampleFourUploaded !== undefined && oldSampleFourKey !== undefined) {
      deleteFiles.push(
        this.awsS3StorageBucketService.deleteFile(oldSampleFourKey),
      );
    }

    if (sampleFiveUploaded !== undefined && oldSampleFiveKey !== undefined) {
      deleteFiles.push(
        this.awsS3StorageBucketService.deleteFile(oldSampleFiveKey),
      );
    }

    await Promise.all(deleteFiles);

    return await this.campaignRepository.findById(campaign._id);
  }

  findAll() {
    return this.campaignRepository.findAll();
  }

  findOne(params: MgFilterQuery<Campaign>) {
    return this.campaignRepository.findOne(params);
  }

  updateCampaignDetails(
    id: MongoTypes.ObjectId,
    updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignRepository.update(id, updateCampaignDto);
  }

  remove(id: string) {
    return this.campaignRepository.remove(id);
  }
}
