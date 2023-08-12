import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { IsUniqueAdminEmail } from 'src/app/admin/pipes/is-unique-admin-email.pipe';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { AdminRole } from '../schemas/admin-role.enum';

/**
 * Dto for creating an admin
 */
export class CreateAdminDto {
  @IsNotEmpty(requiredErrorMessage())
  firstName: string;

  @IsNotEmpty(requiredErrorMessage())
  lastName: string;

  @IsUniqueAdminEmail(
    validationErrorMessage('Field exists', ERROR_CODE.FIELD_EXISTS),
  )
  @Matches(
    /^.*(@getearngage\.com)$/i,
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

  @MinLength(
    6,
    validationErrorMessage(
      'Field must be 6 or more characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  password: string;

  @IsNotEmpty(requiredErrorMessage())
  role: AdminRole;

  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  bio?: string;

  @Allow()
  photo: any;
}
