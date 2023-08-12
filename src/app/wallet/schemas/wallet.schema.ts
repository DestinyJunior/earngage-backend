import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { User } from 'src/app/user/schemas/user.schema';

export type WalletDocument = Wallet & Document;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ required: true, ref: User.name, type: MongoTypes.ObjectId })
  user: MongoTypes.ObjectId;

  // computed from #transactions or online provider
  availableBalance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
