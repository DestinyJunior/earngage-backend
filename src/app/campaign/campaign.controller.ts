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
  Query,
  Put,
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
import { Campaign, CampaignWithId } from './schemas/campaign.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUploadFilesDto } from '../campaign-uploads/dto/create-upload-files.dto';
import { CampaignExistsGuard } from './guards/is-campaign-exists.guard';
import { CreateCampaignPermissionGuard } from './guards/create-campaign-permission.guard';
import { Types as MongoTypes } from 'mongoose';
import { CreateCampaignSampleVideosDto } from 'src/app/campaign-sample-videos/dto/create-campaign-sample-video.dto';
import { UpdateSampleVideoFilesDto } from 'src/app/campaign-sample-videos/dto/create-sample-videos-files.dto';
import { CampaignUploadsExistsGuard } from './guards/is-campaign-upload-exists.guard';
import { CreateCampaignBudgetDto } from '../campaign-budget/dto/create-campaign-budget.dto';
import { MgFilterQuery } from 'src/types/mongoose.types';
import { UpdateEndDateDto } from './dto/update-date.dto';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly entityMapperService: EntityMapperService,
  ) {}

  @Get('published')
  async getCampaignsPublished(@Query() query: MgFilterQuery<Campaign>) {
    const campaigns = await this.campaignService.findAllCampaignsFiltered(
      query,
    );

    return ResponseDto.success(
      'campaigns fetched',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaigns),
    );
  }

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
    CampaignUploadsExistsGuard,
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
    @UploadedFiles() sampleVideosDto: UpdateSampleVideoFilesDto,
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

  @Post('add-budget/:campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
    CampaignUploadsExistsGuard,
  )
  async addBudget(
    @DataParam('campaign') campaign: CampaignWithId,
    @Body() createCampaignBudget: CreateCampaignBudgetDto,
  ) {
    const result = await this.campaignService.addBudget(
      campaign,
      createCampaignBudget,
    );

    return ResponseDto.success(
      'campaign budget added, proceed to publish',
      this.entityMapperService.entityToDto(CreatedCampaignDto, result),
    );
  }

  @Get()
  @UseGuards(UserExistsGuard, JwtAuthGuard, CreateCampaignPermissionGuard)
  async findAllCreatorCampaigns(
    @UserParam() user: User,
    @Query() query: MgFilterQuery<Campaign>,
  ) {
    const campaigns = await this.campaignService.findAllCreatorCampaigns(
      user,
      query,
    );

    return ResponseDto.success(
      'Campaign data fetched',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaigns),
    );
  }

  @Get(':campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  async findOne(@Param('campaignId') campaignId: string) {
    const campaign = await this.campaignService.findOne({
      _id: new MongoTypes.ObjectId(campaignId),
    });

    return ResponseDto.success(
      'Campaign data fetched',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaign),
    );
  }

  @Patch(':campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  async update(
    @Param('campaignId') campaignId: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    const campaign = await this.campaignService.updateCampaignDetails(
      new MongoTypes.ObjectId(campaignId),
      updateCampaignDto,
    );

    return ResponseDto.success(
      'Campaign data updated',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaign),
    );
  }

  @Put(':campaignId/publish')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  async publishCampaign(@Param('campaignId') campaignId: string) {
    const campaign = await this.campaignService.publishCampaign(
      new MongoTypes.ObjectId(campaignId),
    );

    return ResponseDto.success(
      'Campaign published',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaign),
    );
  }

  @Patch(':campaignId/change-date')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  async changeEndDate(
    @Param('campaignId') campaignId: string,
    @DataParam('campaign') campaign: CampaignWithId,
    @Body() changeDateDto: UpdateEndDateDto,
  ) {
    await this.campaignService.changeEndDate(
      new MongoTypes.ObjectId(campaignId),
      campaign,
      changeDateDto,
    );

    return ResponseDto.success(
      'Campaign published',
      this.entityMapperService.entityToDto(CreatedCampaignDto, campaign),
    );
  }

  @Delete(':campaignId')
  @UseGuards(
    UserExistsGuard,
    JwtAuthGuard,
    CreateCampaignPermissionGuard,
    CampaignExistsGuard,
  )
  async remove(@Param('campaignId') campaignId: string) {
    await this.campaignService.remove(new MongoTypes.ObjectId(campaignId));

    return ResponseDto.success('Campaign data deleted');
  }
}
