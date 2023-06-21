import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { requiredErrorMessage } from 'src/error/validation-error.function';

class CountryValidator {
  @IsNotEmpty(requiredErrorMessage())
  name: string;

  @IsNotEmpty(requiredErrorMessage())
  shortCode: string;
}

class PhoneValidator {
  @IsNotEmpty(requiredErrorMessage())
  code: string;

  @IsNotEmpty(requiredErrorMessage())
  number: string;

  @ValidateNested()
  @Type(() => CountryValidator)
  country: CountryValidator;
}

export { CountryValidator, PhoneValidator };
