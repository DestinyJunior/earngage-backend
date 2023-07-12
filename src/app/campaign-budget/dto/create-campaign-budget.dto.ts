import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { requiredErrorMessage } from 'src/error/validation-error.function';

class EstimationDataDto {
  @IsNotEmpty(requiredErrorMessage())
  min: number;

  @IsNotEmpty(requiredErrorMessage())
  max: number;
}

export class CreateCampaignBudgetDto {
  @IsNotEmpty(requiredErrorMessage())
  budgetAmount: string;

  @IsNotEmpty(requiredErrorMessage())
  @ValidateNested()
  @Type(() => EstimationDataDto)
  estimatedReach: EstimationDataDto;

  @IsNotEmpty(requiredErrorMessage())
  @ValidateNested()
  @Type(() => EstimationDataDto)
  estimatedViews: EstimationDataDto;
}
