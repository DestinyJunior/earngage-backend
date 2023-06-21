import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { unauthorizedMissingCredentialsError } from 'src/error/error.functions';

/**
 * Guard that checks for success of email & password admin login.
 */
@Injectable()
export class LocalAdminAuthGuard extends AuthGuard('local-admin') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw error || unauthorizedMissingCredentialsError();
    }
    return user;
  }
}
