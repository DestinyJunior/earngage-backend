import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { IsUniqueAdminEmail } from 'src/app/admin/pipes/is-unique-admin-email.pipe';

/**
 * Dto for updating an admin's email
 */
export class UpdateAdminEmailDto {
  @IsUniqueAdminEmail(
    validationErrorMessage('Field exists', ERROR_CODE.FIELD_EXISTS),
  )
  @Matches(
    /^.*(@niyo\.co)$/i,
    validationErrorMessage(
      'Field should contain company domain',
      ERROR_CODE.FIELD_NOT_ALLOWED,
    ),
  )
  @IsEmail(
    {},
    validationErrorMessage('Field invalid', ERROR_CODE.FIELD_INVALID),
  )
  @IsNotEmpty(requiredErrorMessage())
  email: string;
}
