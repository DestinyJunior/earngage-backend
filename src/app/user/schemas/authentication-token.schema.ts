import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { GenerateOptions } from 'randomstring';
import { User } from './user.schema';

/**
 * Reset password token entity
 */
export class ResetPasswordToken {
  static readonly TOKEN_CONFIG: GenerateOptions = {
    length: 5,
    readable: true,
    capitalization: 'uppercase',
    charset: 'number',
  };

  static readonly TOKEN_EXPIRES_MINUTES = 10;

  @Prop({ ref: User.name, type: mongoose.Types.ObjectId })
  user: mongoose.Types.ObjectId;

  @Prop()
  token: string;

  @Prop({ type: Date })
  expiresAt: Date;

  @Prop({ type: Boolean, default: false })
  used: boolean;
}
