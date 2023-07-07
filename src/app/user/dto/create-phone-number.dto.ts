import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { requiredErrorMessage } from 'src/error/validation-error.function';

export class CreateCountryDto {
  @IsNotEmpty(requiredErrorMessage())
  name: string;

  @IsNotEmpty(requiredErrorMessage())
  shortCode: string;
}

export class CreatePhoneNumberDto {
  @IsNotEmpty(requiredErrorMessage())
  code: string;

  @IsNotEmpty(requiredErrorMessage())
  number: string;

  @ValidateNested()
  @Type(() => CreateCountryDto)
  country: CreateCountryDto;
}
