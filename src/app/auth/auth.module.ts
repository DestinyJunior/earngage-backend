import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/app/auth/strategies/local.strategy';
import { LocalEmailTokenStrategy } from 'src/app/auth/strategies/local-email-token.strategy';
import { UserModule } from 'src/app/user/user.module';
import { JwtStrategy } from 'src/app/auth/strategies/jwt.strategy';
import { HashService } from 'src/service/hash/hash.service';
import { EmailingService } from 'src/service/emailing/emailing.service';
import { StringGeneratorService } from 'src/service/string-generator/string-generator.service';
import { AdminModule } from 'src/app/admin/admin.module';
import { LocalAdminStrategy } from 'src/app/auth/strategies/local-admin.strategy';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';

/**
 * Auth module configurations.
 */
@Module({
  imports: [
    UserModule,
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_TOKEN_DURATION') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    HashService,
    AuthService,
    EmailingService,
    EntityMapperService,
    StringGeneratorService,
    JwtStrategy,
    LocalStrategy,
    LocalAdminStrategy,
    LocalEmailTokenStrategy,
  ],
})
export class AuthModule {}
