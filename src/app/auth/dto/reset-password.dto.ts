import { IsNotEmpty, Length, MinLength } from 'class-validator';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  invalidErrorMessage,
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { ResetPasswordToken } from 'src/app/user/schemas/authentication-token.schema';
import { IsNotExpiredPasswordResetToken } from 'src/app/user/pipes/is-not-expired-password-reset-token.pipe';
import { IsValidPasswordResetToken } from 'src/app/user/pipes/is-valid-password-reset-token.pipe';

/**
 * Dto for resetting a password.
 */
export class ResetPasswordDto {
  @IsNotExpiredPasswordResetToken(
    validationErrorMessage('Field has expired', ERROR_CODE.FIELD_EXPIRED),
  )
  @IsValidPasswordResetToken(
    validationErrorMessage('Field do not exist', ERROR_CODE.FIELD_DO_NOT_EXIST),
  )
  @Length(
    ResetPasswordToken.TOKEN_CONFIG.length,
    ResetPasswordToken.TOKEN_CONFIG.length,
    invalidErrorMessage(),
  )
  @IsNotEmpty(requiredErrorMessage())
  passwordResetToken: string;

  @MinLength(
    6,
    validationErrorMessage(
      'Field must be 6 or more characters long',
      ERROR_CODE.FIELD_LENGTH,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  password: string;
}
