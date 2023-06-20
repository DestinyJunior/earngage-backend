import { BadRequestException, ValidationError } from '@nestjs/common';
import { ERROR_CODE } from './error-code.constants';

/**
 * Creates validation options.
 */
export const validationErrorMessage = (
  message: string,
  errorCode: ERROR_CODE,
  propertyName?: string,
) => ({
  message,
  context: {
    errorCode,
    propertyName,
  },
});

export const requiredErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'Field is required',
    ERROR_CODE.FIELD_REQUIRED,
    propertyName,
  );

export const invalidErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'Field is invalid',
    ERROR_CODE.FIELD_INVALID,
    propertyName,
  );

export const numberErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'Field is not a number',
    ERROR_CODE.FIELD_NOT_NUMBER,
    propertyName,
  );

export const booleanErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'Field is not a boolean',
    ERROR_CODE.FIELD_NOT_BOOLEAN,
    propertyName,
  );

export const arrayErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'Field is not an array',
    ERROR_CODE.FIELD_NOT_ARRAY,
    propertyName,
  );

/**
 * Maps class-validator ValidationError to application format.
 */
const errorMapper = (error: ValidationError) => {
  const context = error.contexts ? Object.values(error.contexts)[0] : null;
  const errorMessage = error.constraints
    ? Object.values(error.constraints)[0]
    : null;

  return {
    value: error.value,
    message: errorMessage,
    errorCode: context?.errorCode ?? ERROR_CODE.FIELD_INVALID,
    name: context?.propertyName ?? error.property,
    errors: error.children?.map((error) => errorMapper(error)),
  };
};

/**
 * Makes custom class-validator ValidationError.
 */
export const createValidationError = (
  value: any,
  message: string,
  property: string,
  errorCode: ERROR_CODE,
) => ({
  value,
  constraints: { custom: message },
  property,
  contexts: {
    custom: { errorCode },
  },
  children: [],
});

/**
 * Maps an array of class-validator ValidationError using the errorMapper.
 */
export const validationErrorFactory = (
  validationErrors: ValidationError[] = [],
) =>
  new BadRequestException(validationErrors.map((error) => errorMapper(error)));
