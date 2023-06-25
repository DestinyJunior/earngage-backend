import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Wallet } from 'src/app/wallet/schemas/wallet.schema';

export type WalletTransactionDocument = WalletTransaction & Document;

export enum TRANSACTION_TYPE {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
  COMPUTED_BALANCE = 'COMPUTED',
}

export enum TRANSACTION_STATUS {
  DECLINED = 'Declined',
  REFUND_PROCESSING = 'Awaiting refund',
  REFUND_PROCESSED = 'Refund Processed',
  SUCCESS = 'Success',
  CANCELLED = 'Cancelled',
  PENDING = 'Pending',
}

@Schema({ timestamps: true })
export class WalletTransaction {
  @Prop({ enum: TRANSACTION_TYPE, required: true })
  transactionType: string;

  @Prop({
    enum: TRANSACTION_STATUS,
    required: true,
    default: TRANSACTION_STATUS.PENDING,
  })
  status: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, ref: Wallet.name, type: mongoose.Types.ObjectId })
  wallet: mongoose.Types.ObjectId;
}

export const WalletTransactionSchema =
  SchemaFactory.createForClass(WalletTransaction);
