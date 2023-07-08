import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { UserParam } from 'src/decorator/user-param.decorator';
import { UserExistsGuard } from '../user/guards/user-exists.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/schemas/user.schema';
import { CreatedCampaignDto } from './dto/created-campaign.dto';
import { CreateCampaignUploadDto } from '../campaign-uploads/dto/create-campaign-upload.dto';
import { DataParam } from 'src/decorator/data-param.decorator';
import { CampaignWithId } from './schemas/campaign.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUploadFilesDto } from '../campaign-uploads/dto/create-upload-files.dto';
import { CampaignExistsGuard } from './guards/is-campaign-exists.guard';
import { CreateCampaignPermissionGuard } from './guards/create-campaign-permission.guard';
import { Types as MongoTypes } from 'mongoose';
import { CreateCampaignSampleVideosDto } from 'src/campaign-sample-videos/dto/create-campaign-sample-video.dto';
import { UpdateSampleVideoFilesDto } from 'src/campaign-sample-videos/dto/create-sample-videos-files.dto';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly entityMapperService: EntityMapperService,
  ) {}

  @Post()
  @UseGuards(UserExistsGuard, JwtAuthGuard, CreateCampaignPermissionGuard)
  async create(
    @UserParam() user: User,
    @Body() createCampaignDto: CreateCampaignDto,
  ) {
    const campaign = await this.campaignService.create(createCampaignDto, user);

    return ResponseDto.success(
      'campaign created, continue to setting campaign budget',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaign),
    );
  }

  @Post('uploads/:campaignId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'campaignCover', maxCount: 1 },
        { name: 'campaignVideo', maxCount: 1 },
      ],
      // {
      //   limits: {
      //     files: 2,
      //     // fileSize: 1024 * 1024,
      //   },
      // },
    ),
  )
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  async addOrUpdateUploads(
    @DataParam('campaign') campaign: CampaignWithId,
    @Body() createCampaignDto: CreateCampaignUploadDto,
    @UploadedFiles() uploadDto: UpdateUploadFilesDto,
  ) {
    console.log(uploadDto);
    const campaignData = await this.campaignService.addUploads(
      campaign,
      createCampaignDto,
      uploadDto,
    );

    return ResponseDto.success(
      'campaign uploads successfully added',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaignData),
    );
  }

  @Post('sample-videos/:campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'sampleOne', maxCount: 1 },
        { name: 'sampleTwo', maxCount: 1 },
        { name: 'sampleThree', maxCount: 1 },
        { name: 'sampleFour', maxCount: 1 },
        { name: 'sampleFive', maxCount: 1 },
      ],
      {
        limits: {
          files: 5,
          // fileSize: 1024 * 1024,
        },
      },
    ),
  )
  async addOrUpdateSampleVideos(
    @DataParam('campaign') campaign: CampaignWithId,
    @Body() createSampleVideosDto: CreateCampaignSampleVideosDto,
    @Body() sampleVideosDto: UpdateSampleVideoFilesDto,
  ): Promise<ResponseDto> {
    const campaignData = await this.campaignService.addSampleVideos(
      campaign,
      createSampleVideosDto,
      sampleVideosDto,
    );

    return ResponseDto.success(
      'campaign sample videos added successfully',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaignData),
    );
  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  findOne(@Param('campaignId') campaignId: string) {
    return this.campaignService.findOne(new MongoTypes.ObjectId(campaignId));
  }

  @Patch(':campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  update(
    @Param('campaignId') campaignId: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.updateCampaignDetails(
      new MongoTypes.ObjectId(campaignId),
      updateCampaignDto,
    );
  }

  @Delete(':campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  remove(@Param('campaignId') campaignId: string) {
    return this.campaignService.remove(campaignId);
  }
}
