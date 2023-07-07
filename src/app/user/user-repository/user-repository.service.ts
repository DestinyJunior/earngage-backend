import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  AuthToken,
  AuthTokenDocument,
} from 'src/app/user/schemas/authentication-token.schema';
import {
  User,
  UserDocument,
  UserStatus,
} from 'src/app/user/schemas/user.schema';
import { CreatePhoneNumberDto } from '../dto/create-phone-number-dto';

/**
 * Database repository class for user entity
 */
@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(AuthToken.name)
    private authTokenModel: Model<AuthTokenDocument>,
  ) {}

  /**
   * Checks if a user entity with an email exists.
   */
  async existsByPhone(phoneNumber: Pick<CreatePhoneNumberDto, 'number'>) {
    const user = await this.userModel
      .findOne({
        'phoneNumber.number': phoneNumber.number,
      })
      .exec();
    return user !== null;
  }

  /**
   * Checks if a user entity with an phone exists.
   */
  async existsByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user !== null;
  }

  /**
   * Checks if a user entity with an email verification token exists.
   */
  async existsByAuthCodeToken(
    phoneNumber: Pick<CreatePhoneNumberDto, 'number'>,
  ) {
    const user = await this.userModel
      .findOne({ 'phoneNumber.number': phoneNumber.number })
      .exec();
    return user !== null;
  }

  async findOneUserProfile(user: User) {
    return await this.findById(user.id);
  }

  /**
   * Checks if a user entity with a auth reset token exists.
   */
  async existsAuthTokenByUser(userId: string) {
    const token = await this.authTokenModel
      .findOne({ user: new mongoose.Types.ObjectId(userId) })
      .exec();
    return token !== null;
  }

  /**
   * Checks if a user entity with a photo name exists.
   */
  async existsByPhotoName(photoName: string) {
    const user = await this.userModel
      .findOne({ 'photo.name': photoName })
      .exec();
    return user !== null;
  }

  /**
   * Finds a user entity with an id
   */
  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  /**
   * Finds a user entity with an email
   */
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Finds a user entity with an email
   */
  findByPhone(phoneNumber: Pick<CreatePhoneNumberDto, 'number'>) {
    return this.userModel
      .findOne({
        'phoneNumber.number': phoneNumber.number,
      })
      .exec();
  }

  /**
   * Finds a user entity with an email and email verification token
   */
  findByEmailAndEmailVerificationToken(
    email: string,
    emailVerificationToken: string,
  ) {
    return this.userModel.findOne({ email, emailVerificationToken }).exec();
  }

  /**
   * Finds a user entity with an email verification token
   */
  findByEmailVerificationToken(emailVerificationToken: string) {
    return this.userModel.findOne({ emailVerificationToken }).exec();
  }

  /**
   * Finds a user entity auth token
   */
  findAuthTokenByUser(userId: string) {
    return this.authTokenModel
      .findOne({ user: new mongoose.Types.ObjectId(userId) })
      .exec();
  }

  /**
   * Create a user auth token
   */
  async createOrUpdateAuthToken(authToken: AuthToken) {
    const getAuthToken = await this.authTokenModel.findOne({
      user: new mongoose.Types.ObjectId(authToken.user),
    });

    if (!getAuthToken) {
      return this.authTokenModel.create(authToken);
    }

    return this.authTokenModel.findByIdAndUpdate(getAuthToken._id, authToken);
  }

  /**
   * Creates a user entity
   */
  create(user: Pick<User, 'phoneNumber' | 'status'>) {
    return this.userModel.create(user);
  }

  /**
   * Updates a user entity profile
   */
  update(
    _id: string,
    {
      firstName,
      lastName,
      photo,
    }: Pick<User, 'firstName' | 'lastName' | 'photo'>,
  ) {
    return this.userModel
      .updateOne(
        { _id },
        {
          firstName,
          lastName,
          photo,
        },
      )
      .exec();
  }

  /**
   * Updates a user entity email
   */
  updateEmail(_id: string, email: string, emailVerificationToken: string) {
    return this.userModel
      .updateOne(
        { _id },
        { email, emailVerificationToken, emailVerified: false },
      )
      .exec();
  }

  /**
   * Updates a user entity status
   */
  updateStatus(_id: string, status: UserStatus) {
    return this.userModel.updateOne({ _id }, { status }).exec();
  }

  /**
   * Updates a user entity reset token
   */
  updateAuthTokenByUser(
    userId: string,
    authTokenData: Pick<AuthToken, 'token' | 'expiresAt' | 'used'>,
  ) {
    return this.authTokenModel
      .updateOne({ user: new mongoose.Types.ObjectId(userId) }, authTokenData)
      .exec();
  }

  /**
   * Updates a user entity reset token
   */
  updateAuthTokenUsedByUser(
    userId: string,
    authTokenData: Pick<AuthToken, 'usedAt' | 'used'>,
  ) {
    return this.authTokenModel
      .updateOne({ user: new mongoose.Types.ObjectId(userId) }, authTokenData)
      .exec();
  }
}
