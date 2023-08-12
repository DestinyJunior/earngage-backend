import { Allow, IsNotEmpty, MinLength } from 'class-validator';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  invalidErrorMessage,
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { REQUEST } from 'src/interceptor/inject-request-into-validation.interceptor';
import { IsValidAdminPassword } from 'src/app/admin/pipes/is-valid-admin-password.pipe';

/**
 * Dto for updating an admin password
 */
export class UpdateAdminPasswordDto {
  @MinLength(
    6,
    validationErrorMessage(
      'Field must be 6 or more characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  password: string;

  @IsValidAdminPassword(invalidErrorMessage())
  oldPassword: string;

  @Allow()
  [REQUEST]: any;
}
