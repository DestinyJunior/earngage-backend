import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ERROR_CODE } from 'src/error/error-code.constants';

/**
 * Guard that checks for success of JWT login.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException(
          'Invalid access token',
          ERROR_CODE.INVALID_TOKEN,
        )
      );
    }
    return user;
  }
}
