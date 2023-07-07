import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { HashService } from 'src/service/hash/hash.service';
import { UserStatus } from 'src/app/user/schemas/user.schema';
import { UpdateUserProfile } from 'src/app/user/dto/update-user-profile.dto';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { GcpStorageBucketService } from 'src/service/storage-bucket/gcp.storage-bucket.service';
import { StringGeneratorService } from '../../service/string-generator/string-generator.service';
import { UpdateUserPhotosDto } from 'src/app/user/dto/update-user-photos.dto';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { AuthToken } from './schemas/authentication-token.schema';
import { SetUserAccountTypeDto } from './dto/create-user-type.dto';
import { UserType } from './schemas/user-type.enum';

/**
 * Service class that handles user system logic.
 */
@Injectable()
export class UserService {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepository: UserRepositoryService,
    private readonly entityMapperService: EntityMapperService,
    private readonly gcpStorageBucketService: GcpStorageBucketService,
    private readonly stringGeneratorService: StringGeneratorService,
  ) {}

  /**
   * Generates a unique email verification token for user.
   */
  generateEmailVerificationToken() {
    return this.stringGeneratorService
      .setExists(
        this.userRepository.existsByAuthCodeToken.bind(this.userRepository),
      )
      .generate(User.EMAIL_VERIFICATION_TOKEN_CONFIG);
  }

  /**
   * Handles setting user account type.
   */
  async setUserAccount(user: User, { accountType }: SetUserAccountTypeDto) {
    if (user.accountType === UserType.NONE) {
      await this.userRepository.setAccountType(user.id, accountType, {
        phoneNumberVerified: true,
        status: UserStatus.ACTIVE,
      });
    }
    return true;
  }

  /**
   * Handles fetching a user.
   */
  findOne(id: string) {
    return this.userRepository.findById(id);
  }

  /**
   * Handles update of a user.
   */
  async update(
    user: User,
    updateUserDto: UpdateUserProfile,
    photosDto: UpdateUserPhotosDto,
  ) {
    const oldPhotoKey = user.photo?.name;

    const photoUploaded =
      photosDto?.photo !== undefined && photosDto.photo.length > 0;

    await this.userRepository.update(user.id, updateUserDto);

    return this.userRepository.findById(user.id);
  }

  /**
   * Handles update of user email.
   */
  async updateEmail(user: User, email: string) {
    const emailVerificationToken = await this.generateEmailVerificationToken();

    await this.userRepository.updateEmail(
      user.id,
      email,
      emailVerificationToken,
    );

    // await this.emailingService.sendEmailVerification(
    //   user.email,
    //   emailVerificationToken,
    // );

    return this.userRepository.findById(user.id);
  }

  /**
   * Handles user auth token update.
   */
  async updateAuthToken(user: User, authToken: AuthToken) {
    authToken.token = await this.hashService.hashString(authToken.token);
    await this.userRepository.updateAuthTokenByUser(user.id, authToken);
    return this.userRepository.findById(user.id);
  }
}
