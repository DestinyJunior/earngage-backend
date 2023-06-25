import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/app/user/schemas/user.schema';

export type WalletDocument = Wallet & Document;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ required: true, ref: User.name, type: mongoose.Types.ObjectId })
  user: mongoose.Types.ObjectId;

  // computed from #transactions or online provider
  availableBalance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
