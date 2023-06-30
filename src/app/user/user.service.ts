import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { HashService } from 'src/service/hash/hash.service';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UserStatus } from 'src/app/user/schemas/user.schema';
import { EmailingService } from 'src/service/emailing/emailing.service';
import { UpdateUserProfile } from 'src/app/user/dto/update-user-profile.dto';
import { UserRepositoryService } from './user-repository/user-repository.service';
import { GcpStorageBucketService } from 'src/service/storage-bucket/gcp.storage-bucket.service';
import { StringGeneratorService } from '../../service/string-generator/string-generator.service';
import { UpdateUserPhotosDto } from 'src/app/user/dto/update-user-photos.dto';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { AuthToken } from './schemas/authentication-token.schema';

/**
 * Service class that handles user system logic.
 */
@Injectable()
export class UserService {
  constructor(
    private readonly hashService: HashService,
    private readonly emailingService: EmailingService,
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
        this.userRepository.existsByEmailVerificationToken.bind(
          this.userRepository,
        ),
      )
      .generate(User.EMAIL_VERIFICATION_TOKEN_CONFIG);
  }

  /**
   * Handles creating of a user.
   */
  async create({ email, user, phoneNumber }: CreateUserDto) {
    if (user === null) {
      user = await this.userRepository.create({
        email,
        phoneNumber,
        status: UserStatus.DRAFT,
      });
    }

    // send phone number verification
    // await this.emailingService.sendEmailVerification(
    //   email,
    //   emailVerificationToken,
    // );

    return user;
  }

  /**
   * Handles fetching a user.
   */
  findOne(id: string) {
    return this.userRepository.findById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
   * Handles email verification of user.
   */
  async updateEmailVerified(user: User, emailVerified: boolean) {
    await this.userRepository.updateEmailVerified(user.id, emailVerified);
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

  /**
   * Handles update and resend of email verification token.
   */
  async updateEmailVerificationToken(user: User) {
    const emailVerificationToken = await this.generateEmailVerificationToken();

    await this.userRepository.updateEmailVerificationToken(
      user.id,
      emailVerificationToken,
    );

    // await this.emailingService.sendEmailVerification(
    //   user.email,
    //   emailVerificationToken,
    // );

    return this.userRepository.findById(user.id);
  }
}
