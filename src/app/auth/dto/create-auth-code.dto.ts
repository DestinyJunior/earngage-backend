import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from 'src/app/user/dto/create-phone-number-dto';
import { requiredErrorMessage } from 'src/error/validation-error.function';

/**
 * Dto for making a user auth code request
 */
export class CreateLoginAuthCode {
  @IsNotEmpty(requiredErrorMessage())
  @ValidateNested()
  @Type(() => CreatePhoneNumberDto)
  phoneNumber: CreatePhoneNumberDto;
}
