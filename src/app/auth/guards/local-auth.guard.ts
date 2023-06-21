import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { unauthorizedMissingCredentialsError } from 'src/error/error.functions';

/**
 * Guard that checks for success of email & password user login.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw error || unauthorizedMissingCredentialsError();
    }
    return user;
  }
}
