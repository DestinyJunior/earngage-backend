import { IsDateString, IsNotEmpty } from 'class-validator';
import { requiredErrorMessage } from 'src/error/validation-error.function';

export class UpdateEndDateDto {
  @IsNotEmpty(requiredErrorMessage())
  @IsDateString()
  endDate: string;
}
