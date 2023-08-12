import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/app/auth/auth.service';
import { unauthorizedIncorrectCredentialsError } from 'src/error/error.functions';

/**
 * Passport strategy for email & password admin login.
 */
@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const admin = await this.authService.verifyAdminPasswordAuth(
      email,
      password,
    );

    if (admin === null) {
      throw unauthorizedIncorrectCredentialsError();
    }

    return admin;
  }
}
