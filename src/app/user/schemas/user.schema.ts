import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenerateOptions } from 'randomstring';
import { Photo } from 'src/app/file-upload/schemas/photo.schema';
import { ResetPasswordToken } from 'src/app/user/schemas/reset-password-token.schema';

/**
 * Enum of user status
 */
export enum UserStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

/**
 * Enum of user types
 */
export enum UserType {
  CREATOR = 'CREATOR',
  INFLUENCER = 'INFLUENCER',
}

export type UserDocument = User & Document;

/**
 * User entity
 */
@Schema({ timestamps: true })
export class User {
  static readonly EMAIL_VERIFICATION_TOKEN_CONFIG: GenerateOptions = {
    length: 6,
    readable: true,
    capitalization: 'uppercase',
  };

  static readonly PHOTO_PATH = 'user/';

  id: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ required: true, type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ required: true })
  emailVerificationToken: string;

  @Prop({ required: true })
  status: UserStatus;

  @Prop()
  password?: string;

  @Prop()
  bio?: string;

  @Prop()
  country?: string;

  @Prop({ type: ResetPasswordToken })
  resetPasswordToken?: ResetPasswordToken;

  @Prop({ type: Photo })
  photo?: Photo;

  @Prop({ type: Photo })
  headerPhoto?: Photo;

  @Prop({})
  role: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
