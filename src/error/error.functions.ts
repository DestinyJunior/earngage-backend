import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ERROR_CODE } from 'src/error/error-code.constants';

/**
 * Functions that return application generic HTTP errors.
 */

export const forbiddenError = (message = 'Permission denied') =>
  new ForbiddenException(message, ERROR_CODE.PERMISSION_DENIED);

export const notFoundError = (message = 'Resource not found') =>
  new NotFoundException(message, ERROR_CODE.RESOURCE_DO_NOT_EXIST);

export const unauthorizedIncorrectCredentialsError = () =>
  new UnauthorizedException(
    'Credentials are incorrect',
    ERROR_CODE.CREDENTIALS_INCORRECT,
  );

export const unauthorizedMissingCredentialsError = () =>
  new UnauthorizedException(
    'Credentials missing',
    ERROR_CODE.CREDENTIALS_MISSING,
  );

export const badRequestError = (
  message = 'Bad Request',
  errorCode: string = ERROR_CODE.FIELD_INVALID,
) => new BadRequestException(message, errorCode);

export const internalServerError = (
  message = 'Server error',
  errorCode: string = ERROR_CODE.SERVER_ERROR,
) => new InternalServerErrorException(message, errorCode);
