import { Injectable, PipeTransform } from '@nestjs/common';
import { ERROR_CODE } from 'src/error/error-code.constants';
import {
  createValidationError,
  validationErrorFactory,
} from 'src/error/validation-error.function';

@Injectable()
export class IsUploadedPipe implements PipeTransform {
  transform(value: Express.Multer.File[]) {
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      throw validationErrorFactory([
        createValidationError(
          undefined,
          'Field is required',
          'photo',
          ERROR_CODE.FIELD_REQUIRED,
        ),
      ]);
    }

    return value;
  }
}
