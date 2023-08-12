import { Allow, IsNotEmpty, IsOptional } from 'class-validator';
import { Types as MongoTypes } from 'mongoose';
import { requiredErrorMessage } from 'src/error/validation-error.function';

export class CreateSubmissionDto {
  @IsNotEmpty(requiredErrorMessage())
  campaign: MongoTypes.ObjectId;

  @IsNotEmpty(requiredErrorMessage())
  user: MongoTypes.ObjectId;

  @IsOptional()
  rewardAmount?: number;

  @IsOptional()
  bookmarked?: boolean;

  @IsOptional()
  impressions?: any;

  @Allow()
  creator?: MongoTypes.ObjectId;
}
