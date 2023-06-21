import { Allow, IsNotEmpty, Length } from 'class-validator';
import { REQUEST } from 'src/interceptor/inject-request-into-validation.interceptor';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  invalidErrorMessage,
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { IsValidEmailVerificationToken } from 'src/app/user/pipes/is-valid-email-verification-token.pipe';

/**
 * Dto for updating a user's email-verified.
 */
export class UpdateUserEmailVerifiedDto {
  @IsValidEmailVerificationToken(invalidErrorMessage())
  @Length(
    6,
    6,
    validationErrorMessage(
      'Field must be 6 characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  emailVerificationToken: string;

  @Allow()
  [REQUEST]: any;
}
