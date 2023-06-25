import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { IsUniqueEmailPipe } from './pipes/is-unique-email.pipe';
import { EntityMapperService } from '../../service/entity-mapper/entity-mapper.service';
import { StringGeneratorService } from '../../service/string-generator/string-generator.service';
import { IsValidEmailVerificationTokenPipe } from './pipes/is-valid-email-verification-token.pipe';
import { IsValidPasswordPipe } from './pipes/is-valid-password.pipe';
import { HashService } from 'src/service/hash/hash.service';
import { PermissionModule } from 'src/app/permission/permission.module';
import { PhotoModule } from 'src/app/file-upload/photo.module';
import { EmailingService } from 'src/service/emailing/emailing.service';
import { ConfigModule } from '@nestjs/config';
import { IsValidEmailPipe } from 'src/app/user/pipes/is-valid-email.pipe';
import { IsValidPasswordResetTokenPipe } from 'src/app/user/pipes/is-valid-password-reset-token.pipe';
import { IsNotExpiredPasswordResetTokenPipe } from 'src/app/user/pipes/is-not-expired-password-reset-token.pipe';
import { StorageBucketService } from 'src/service/storage-bucket/storage-bucket.service';
import {
  AuthToken,
  AuthTokenSchema,
} from './schemas/authentication-token.schema';

/**
 * User module configurations.
 */
@Module({
  imports: [
    ConfigModule,
    PhotoModule.registerAsync({
      import: [UserModule],
      inject: [UserRepositoryService],
      useFactory: (userRepository: UserRepositoryService) => ({
        namePrefix: User.PHOTO_PATH,
        nameExists: userRepository.existsByPhotoName.bind(userRepository),
      }),
    }),
    PermissionModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: AuthToken.name, schema: AuthTokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepositoryService,
    IsUniqueEmailPipe,
    IsValidEmailPipe,
    IsValidPasswordPipe,
    IsValidEmailVerificationTokenPipe,
    IsValidPasswordResetTokenPipe,
    IsNotExpiredPasswordResetTokenPipe,
    EntityMapperService,
    StringGeneratorService,
    HashService,
    EmailingService,
    StorageBucketService,
  ],
  exports: [UserRepositoryService],
})
export class UserModule {}
