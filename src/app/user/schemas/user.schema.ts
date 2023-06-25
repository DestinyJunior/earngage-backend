import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Photo } from 'src/app/file-upload/schemas/photo.schema';
import { UserType } from './user-type.enum';
import { PhoneNumberField } from './phone-number.schema';
import { GenerateOptions } from 'randomstring';

/**
 * Enum of user status
 */
export enum UserStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export type UserDocument = User & Document;

/**
 * User entity
 */
@Schema({ timestamps: true })
export class User {
  static readonly EMAIL_VERIFICATION_TOKEN_CONFIG: GenerateOptions = {
    length: 5,
    readable: true,
    charset: 'number',
  };

  static readonly PHOTO_PATH = 'user/';

  id: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  tiktokHandle?: string;

  @Prop()
  username?: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ required: true, type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ required: true })
  emailVerificationToken: string;

  @Prop({ required: true, type: PhoneNumberField })
  phoneNumber: PhoneNumberField;

  @Prop({ required: true, type: Boolean, default: false })
  phoneNumberVerified: boolean;

  @Prop({ required: true })
  status: UserStatus;

  @Prop()
  password?: string;

  @Prop()
  bio?: string;

  @Prop()
  country?: string;

  @Prop({ type: Photo })
  photo?: Photo;

  @Prop({ default: UserType.INFLUENCER })
  role: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
