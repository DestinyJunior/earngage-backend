import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { GenerateOptions } from 'randomstring';
import { User } from './user.schema';

export type AuthTokenDocument = AuthToken & Document;

/**
 * authentication token entity
 */
@Schema({ timestamps: true })
export class AuthToken {
  static readonly TOKEN_CONFIG: GenerateOptions = {
    length: 5,
    readable: true,
    charset: 'numeric',
  };

  static readonly TOKEN_EXPIRES_MINUTES = 5;

  @Prop({ required: true, ref: User.name, type: MongoTypes.ObjectId })
  user: MongoTypes.ObjectId;

  @Prop()
  token: string;

  @Prop({ type: Date })
  expiresAt: Date;

  @Prop({ type: Date, required: false })
  usedAt?: Date;

  @Prop({ type: Boolean, default: false })
  used: boolean;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
