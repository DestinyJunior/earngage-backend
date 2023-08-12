import { SchemaDto } from 'src/dto/schema.dto';

export class CreatedCampaignDto extends SchemaDto {
  title: string;
  subTitle: string;
  challengeType: string;
  campaignGoal: string;
  instructions: string;
  medium: string;
}
