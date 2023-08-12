import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { unauthorizedMissingCredentialsError } from 'src/error/error.functions';

/**
 * Guard that checks for success of email & email-verification-token login.
 */
@Injectable()
export class LocalEmailTokenAuthGuard extends AuthGuard('local-email-token') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw error || unauthorizedMissingCredentialsError();
    }
    return user;
  }
}
