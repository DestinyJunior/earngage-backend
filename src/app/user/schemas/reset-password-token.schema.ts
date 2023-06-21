import { Prop } from '@nestjs/mongoose';
import { GenerateOptions } from 'randomstring';

/**
 * Reset password token entity
 */
export class ResetPasswordToken {
  static readonly TOKEN_CONFIG: GenerateOptions = {
    length: 6,
    readable: true,
    capitalization: 'uppercase',
  };

  static readonly TOKEN_EXPIRES_MINUTES = 10;

  @Prop()
  token: string;

  @Prop({ type: Date })
  expiresAt: Date;

  @Prop({ type: Boolean, default: false })
  used: boolean;
}
