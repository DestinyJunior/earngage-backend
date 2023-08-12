import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
import { IsUniqueEmail } from '../pipes/is-unique-email.pipe';
import { ERROR_CODE } from 'src/error/error-code.constants';
/**
 * Dto for updating a user data
 */
export class UpdateUserProfile {
  @IsUniqueEmail(
    validationErrorMessage('Field exists', ERROR_CODE.FIELD_EXISTS),
  )
  @Matches(
    /^((?!@getearngage).)*$/i,
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
  @IsOptional()
  email: string;

  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  tiktokHandle?: string;

  @Allow()
  photo: MediaFile;
}
