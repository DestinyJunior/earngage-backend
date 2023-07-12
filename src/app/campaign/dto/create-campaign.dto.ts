import { IsNotEmpty, Length } from 'class-validator';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { IsUniqueCampaignTitle } from '../pipes/is-unique-title.pipe';

export class CreateCampaignDto {
  @IsUniqueCampaignTitle(
    validationErrorMessage('title already exists', ERROR_CODE.FIELD_LENGTH),
  )
  @Length(
    6,
    30,
    validationErrorMessage(
      'Field must be between 10 and 30 characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  title: string;

  @Length(
    10,
    30,
    validationErrorMessage(
      'Field must be between 10 and 100 characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  subTitle: string;

  @IsNotEmpty(requiredErrorMessage())
  challengeType: string;

  @IsNotEmpty(requiredErrorMessage())
  campaignGoal: string;

  @Length(
    50,
    1600,
    validationErrorMessage(
      'Field must be between 10 and 100 characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  instructions: string;

  @IsNotEmpty(requiredErrorMessage())
  medium: string;
}
