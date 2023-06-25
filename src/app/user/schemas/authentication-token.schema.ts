import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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
    charset: 'number',
  };

  static readonly TOKEN_EXPIRES_MINUTES = 10;

  @Prop({ required: true, ref: User.name, type: mongoose.Types.ObjectId })
  user: mongoose.Types.ObjectId;

  @Prop()
  token: string;

  @Prop({ type: Date })
  expiresAt: Date;

  @Prop({ type: Boolean, default: false })
  used: boolean;
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
