import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/app/auth/auth.service';
import { unauthorizedIncorrectCredentialsError } from 'src/error/error.functions';

/**
 * Passport strategy for phoneNumber user login.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'phoneNumber' });
  }

  async validate(phoneNumber: string, token?: string) {
    const user = await this.authService.verifyPhoneTokenAuth(
      phoneNumber,
      token,
    );

    if (user === null) {
      throw unauthorizedIncorrectCredentialsError();
    }

    return user;
  }
}
