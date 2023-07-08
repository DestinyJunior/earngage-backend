import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { CampaignRepository } from './campaign.repository';
import { PermissionModule } from '../permission/permission.module';
import { UserModule } from '../user/user.module';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { IsUniqueCampaignTitlePipe } from './pipes/is-unique-title.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
    PermissionModule,
    UserModule,
  ],
  controllers: [CampaignController],
  providers: [
    EntityMapperService,
    CampaignService,
    CampaignRepository,
    IsUniqueCampaignTitlePipe,
  ],
})
export class CampaignModule {}
