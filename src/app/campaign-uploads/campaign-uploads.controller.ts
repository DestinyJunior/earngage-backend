import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignUploadsService } from './campaign-uploads.service';
import { CreateCampaignUploadDto } from './dto/create-campaign-upload.dto';
import { UpdateCampaignUploadDto } from './dto/update-campaign-upload.dto';

@Controller('campaign-uploads')
export class CampaignUploadsController {
  constructor(private readonly campaignUploadsService: CampaignUploadsService) {}

  @Post()
  create(@Body() createCampaignUploadDto: CreateCampaignUploadDto) {
    return this.campaignUploadsService.create(createCampaignUploadDto);
  }

  @Get()
  findAll() {
    return this.campaignUploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignUploadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignUploadDto: UpdateCampaignUploadDto) {
    return this.campaignUploadsService.update(+id, updateCampaignUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignUploadsService.remove(+id);
  }
}
