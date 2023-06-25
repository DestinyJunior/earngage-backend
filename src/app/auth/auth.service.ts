import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { User } from 'src/app/user/schemas/user.schema';
import { JwtPayload } from 'src/app/auth/dto/jwt-payload.type';
import { EmailingService } from 'src/service/emailing/emailing.service';
import { HashService } from 'src/service/hash/hash.service';
import { StringGeneratorService } from 'src/service/string-generator/string-generator.service';
import { AuthToken } from 'src/app/user/schemas/authentication-token.schema';
import { UserRepositoryService } from 'src/app/user/user-repository/user-repository.service';
import { AdminRepositoryService } from 'src/app/admin/admin.repository';

/**
 * Service class that handles authentication system logic.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly emailingService: EmailingService,
    private readonly userRepository: UserRepositoryService,
    private readonly adminRepository: AdminRepositoryService,
    private readonly stringGeneratorService: StringGeneratorService,
  ) {}

  /**
   * handles verification of login email & auth token token
   */
  async verifyPasswordAuth(email: string, token: string) {
    const user = await this.userRepository.findByEmail(email);
    const authToken = await this.userRepository.findAuthTokenByUser(user._id);

    if (
      user !== null &&
      authToken != null &&
      (await this.hashService.compareString(token, authToken.token))
    ) {
      return user;
    }

    return null;
  }

  /**
   * handles verification of login email & email-verification-token
   */
  verifyEmailTokenAuth(email: string, token: string) {
    return this.userRepository.findByEmailAndEmailVerificationToken(
      email,
      token,
    );
  }

  /**
   * handles verification of login email & password
   */
  async verifyAdminPasswordAuth(email: string, password: string) {
    const admin = await this.adminRepository.findByEmail(email);

    if (
      admin !== null &&
      (await this.hashService.compareString(password, admin.password))
    ) {
      return admin;
    }

    return null;
  }

  /**
   * handles generation of JWT token.
   */
  async getAccessToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      subType: User.name,
    };

    return {
      userId: user.id,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * handles generation of JWT token.
   */
  async getAdminAccessToken(admin: Admin) {
    const payload: JwtPayload = {
      sub: admin.id,
      subType: Admin.name,
    };

    return {
      adminId: admin.id,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * handles generation and sending of reset password token.
   */
  async resendAuthToken(email: string) {
    const user = await this.userRepository.findByEmail(email);

    const expireDate = new Date();

    expireDate.setMinutes(
      expireDate.getMinutes() + AuthToken.TOKEN_EXPIRES_MINUTES,
    );

    const token = await this.stringGeneratorService
      .setExists(
        this.userRepository.existsAuthTokenByUser.bind(this.userRepository),
      )
      .generate(AuthToken.TOKEN_CONFIG);

    await this.userRepository.updateAuthTokenByUser(user.id, {
      token,
      used: false,
      expiresAt: expireDate,
    });

    // TODO: send new email
    // await this.emailingService.sendEmailText(
    //   email,
    //   token,
    //   ResetPasswordToken.TOKEN_EXPIRES_MINUTES,
    // );
  }
}
