import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly entityMapperService: EntityMapperService,
  ) {}

  @Post()
  @UseGuards(UserExistsGuard, JwtAuthGuard)
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

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(+id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(+id);
  }
}
