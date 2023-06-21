import { IsEmail, IsNotEmpty } from 'class-validator';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { IsValidEmail } from 'src/app/user/pipes/is-valid-email.pipe';

/**
 * Dto for making a forgot password request
 */
export class CreateForgotPasswordDto {
  @IsValidEmail(
    validationErrorMessage('Field do not exist', ERROR_CODE.FIELD_DO_NOT_EXIST),
  )
  @IsEmail(
    {},
    validationErrorMessage('Field invalid', ERROR_CODE.FIELD_INVALID),
  )
  @IsNotEmpty(requiredErrorMessage())
  email: string;
}
