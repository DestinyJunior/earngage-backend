import { Allow, IsNotEmpty, MinLength } from 'class-validator';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  invalidErrorMessage,
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { REQUEST } from 'src/interceptor/inject-request-into-validation.interceptor';
import { IsValidPassword } from 'src/app/user/pipes/is-valid-password.pipe';

/**
 * Dto for updating a user password
 */
export class UpdateUserPasswordDto {
  @MinLength(
    6,
    validationErrorMessage(
      'Field must be 6 or more characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  password: string;

  @IsValidPassword(invalidErrorMessage())
  oldPassword: string;

  @Allow()
  [REQUEST]: any;
}
