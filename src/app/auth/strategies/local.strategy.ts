import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/app/auth/auth.service';
import { unauthorizedIncorrectCredentialsError } from 'src/error/error.functions';

/**
 * Passport strategy for email & password user login.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.verifyPasswordAuth(email, password);

    if (user === null) {
      throw unauthorizedIncorrectCredentialsError();
    }

    return user;
  }
}
