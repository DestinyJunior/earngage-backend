import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
import { UserType } from './user-type.enum';
import { PhoneNumberField } from './phone-number.schema';
import { GenerateOptions } from 'randomstring';
import { Types as MongoTypes } from 'mongoose';

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

  @Prop({ unique: true, lowercase: true, trim: true, required: true })
  username?: string;

  @Prop({ required: false, lowercase: true })
  email?: string;

  @Prop({ required: true, type: PhoneNumberField })
  phoneNumber: PhoneNumberField;

  @Prop({ required: true, type: Boolean, default: false, select: false })
  phoneNumberVerified: boolean;

  @Prop({ required: true, default: UserStatus.DRAFT })
  status: UserStatus;

  @Prop({ type: MediaFile })
  photo?: MediaFile;

  @Prop({ default: UserType.NONE })
  accountType: UserType;
}

export class UserWithId extends User {
  _id: MongoTypes.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
