import {
  Allow,
  IsEmail,
  IsNotEmpty,
  Matches,
  ValidateNested,
} from 'class-validator';
import { IsUniqueEmail } from 'src/app/user/pipes/is-unique-email.pipe';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { User } from 'src/app/user/schemas/user.schema';
import { CreatePhoneNumberDto } from './create-phone-number-dto';
import { Type } from 'class-transformer';

/**
 * Dto for creating a user
 */
export class CreateUserDto {
  @IsUniqueEmail(
    validationErrorMessage('Field exists', ERROR_CODE.FIELD_EXISTS),
  )
  @Matches(
    /^((?!@niyo).)*$/i,
    validationErrorMessage(
      'Field should not contain company domain',
      ERROR_CODE.FIELD_NOT_ALLOWED,
    ),
  )
  @IsEmail(
    {},
    validationErrorMessage('Field invalid', ERROR_CODE.FIELD_INVALID),
  )
  @IsNotEmpty(requiredErrorMessage())
  email: string;

  @IsNotEmpty(requiredErrorMessage())
  @ValidateNested()
  @Type(() => CreatePhoneNumberDto)
  phoneNumber: CreatePhoneNumberDto;

  @Allow()
  user: User | null;
}
