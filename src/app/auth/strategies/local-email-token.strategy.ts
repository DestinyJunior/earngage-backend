import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/app/auth/auth.service';
import { unauthorizedIncorrectCredentialsError } from 'src/error/error.functions';

/**
 * Passport strategy for email & email-verification-token login.
 */
@Injectable()
export class LocalEmailTokenStrategy extends PassportStrategy(
  Strategy,
  'local-email-token',
) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'emailVerificationToken' });
  }

  async validate(email: string, token: string) {
    const user = await this.authService.verifyEmailTokenAuth(email, token);

    if (user === null) {
      throw unauthorizedIncorrectCredentialsError();
    }

    return user;
  }
}
