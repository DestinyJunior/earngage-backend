import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignBudgetService } from './campaign-budget.service';
import { CreateCampaignBudgetDto } from './dto/create-campaign-budget.dto';
import { UpdateCampaignBudgetDto } from './dto/update-campaign-budget.dto';

@Controller('campaign-budget')
export class CampaignBudgetController {
  constructor(private readonly campaignBudgetService: CampaignBudgetService) {}

  @Post()
  create(@Body() createCampaignBudgetDto: CreateCampaignBudgetDto) {
    return this.campaignBudgetService.create(createCampaignBudgetDto);
  }

  @Get()
  findAll() {
    return this.campaignBudgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignBudgetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignBudgetDto: UpdateCampaignBudgetDto) {
    return this.campaignBudgetService.update(+id, updateCampaignBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignBudgetService.remove(+id);
  }
}
