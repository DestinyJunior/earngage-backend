import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_CODE } from 'src/error/error-code.constants';
import { User } from 'src/app/user/schemas/user.schema';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { JwtPayload } from 'src/app/auth/dto/jwt-payload.type';
import { UserRepositoryService } from 'src/app/user/user-repository/user-repository.service';
import { AdminRepositoryService } from 'src/app/admin/admin.repository';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';

/**
 * Passport strategy for JWT login.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userRepository: UserRepositoryService,
    private readonly adminRepository: AdminRepositoryService,
    private readonly entityMapperService: EntityMapperService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload && payload.subType === User.name) {
      const user = await this.userRepository.findById(payload.sub);
      return this.entityMapperService.mongooseEntityToClass(User, user);
    } else if (payload && payload.subType === Admin.name) {
      const admin = await this.adminRepository.findById(payload.sub);
      return this.entityMapperService.mongooseEntityToClass(Admin, admin);
    }

    throw new UnauthorizedException(
      'Invalid access token payload',
      ERROR_CODE.INVALID_TOKEN_PAYLOAD,
    );
  }
}
