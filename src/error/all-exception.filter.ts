import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../dto/response.dto';
import { ERROR_CODE } from './error-code.constants';

/**
 * Maps application exceptions to the correct response format.
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let exceptionBody: { message: string; errorCode?: ERROR_CODE; data?: any };

    if (process.env.NODE_ENV === 'development') {
      console.error(exception);
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionRes = exception.getResponse() as any;

      if (exception instanceof BadRequestException) {
        exceptionBody = {
          ...exceptionRes,
        };
      } else {
        exceptionBody = {
          message: exceptionRes.message,
          errorCode: exceptionRes.error,
        };
      }
    } else {
      status = 500;
      exceptionBody = {
        message:
          exception.message || new InternalServerErrorException().message,
      };
    }

    response
      .status(status)
      .json(
        ResponseDto.error(
          exceptionBody.message,
          exceptionBody.errorCode,
          exceptionBody.data,
        ),
      );
  }
}
