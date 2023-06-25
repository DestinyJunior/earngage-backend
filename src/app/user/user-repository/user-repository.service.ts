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
  async existsByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user !== null;
  }

  /**
   * Checks if a user entity with an email verification token exists.
   */
  async existsByEmailVerificationToken(emailVerificationToken: string) {
    const user = await this.userModel
      .findOne({ emailVerificationToken })
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
  createAuthToken(authToken: AuthToken) {
    return this.authTokenModel.create(authToken);
  }

  /**
   * Creates a user entity
   */
  create(user: Pick<User, 'email' | 'phoneNumber' | 'status'>) {
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
      bio,
      country,
      photo,
    }: Pick<User, 'firstName' | 'lastName' | 'bio' | 'country' | 'photo'>,
  ) {
    return this.userModel
      .updateOne(
        { _id },
        {
          firstName,
          lastName,
          bio,
          country,
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
   * Updates a user entity email-verified
   */
  updateEmailVerified(_id: string, emailVerified: boolean) {
    return this.userModel.updateOne({ _id }, { emailVerified }).exec();
  }

  /**
   * Updates a user entity status
   */
  updateStatus(_id: string, status: UserStatus) {
    return this.userModel.updateOne({ _id }, { status }).exec();
  }

  /**
   * Updates a user entity email verification token
   */
  updateEmailVerificationToken(_id: string, emailVerificationToken: string) {
    return this.userModel.updateOne({ _id }, { emailVerificationToken }).exec();
  }

  /**
   * Updates a user entity reset password token
   */
  updateAuthTokenByUser(
    userId: string,
    authTokenData: Pick<AuthToken, 'token' | 'expiresAt' | 'used'>,
  ) {
    return this.authTokenModel
      .updateOne({ user: new mongoose.Types.ObjectId(userId) }, authTokenData)
      .exec();
  }
}