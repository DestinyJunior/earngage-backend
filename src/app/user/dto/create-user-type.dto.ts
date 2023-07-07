import { IsIn, IsNotEmpty } from 'class-validator';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error.function';
import { UserType } from '../schemas/user-type.enum';
import { ERROR_CODE } from 'src/error/error-code.constants';

export class SetUserAccountTypeDto {
  @IsNotEmpty(requiredErrorMessage())
  @IsIn(
    [UserType.CREATOR, UserType.INFLUENCER],
    validationErrorMessage('Field value is invalid', ERROR_CODE.FIELD_INVALID),
  )
  accountType: UserType;
}
