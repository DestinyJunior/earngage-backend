import { Type } from 'class-transformer';
import { Allow, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreatePhoneNumberDto } from 'src/app/user/dto/create-phone-number.dto';
import { IsUniqueUsername } from 'src/app/user/pipes/is-unique-username.pipe';
import { User } from 'src/app/user/schemas/user.schema';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';

/**
 * Dto for making a user auth code request
 */
export class CreateLoginAuthCode {
  @IsNotEmpty(requiredErrorMessage())
  @ValidateNested()
  @Type(() => CreatePhoneNumberDto)
  phoneNumber: CreatePhoneNumberDto;

  @IsOptional()
  @IsUniqueUsername(
    validationErrorMessage('Field exists', ERROR_CODE.FIELD_EXISTS),
  )
  username?: string;

  @Allow()
  user: User | null;
}
