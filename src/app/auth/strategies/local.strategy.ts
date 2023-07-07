import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/app/auth/auth.service';
import { unauthorizedIncorrectCredentialsError } from 'src/error/error.functions';

/**
 * Passport strategy for code user login.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'phoneNumber', passwordField: 'code' });
  }

  async validate(phoneNumber: string, code: string) {
    const user = await this.authService.verifyPhoneTokenAuth(phoneNumber, code);

    if (user === null) {
      throw unauthorizedIncorrectCredentialsError();
    }

    return user;
  }
}
