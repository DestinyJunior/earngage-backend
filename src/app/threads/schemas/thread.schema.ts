import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types as MongoTypes } from 'mongoose';
import { Submission } from '../../submissions/schemas/submission.schema';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';
import { User } from 'src/app/user/schemas/user.schema';

export type SubmissionThreadDocument = SubmissionThread & Document;

export class SubmissionThreadImpressionsData {
  @Prop({ type: Boolean, default: false })
  viewed?: boolean;

  @Prop({ type: Boolean, default: false })
  watched?: boolean;
}

export enum SUBMISSION_THREAD_TYPE {
  TEXT_ONLY,
  TEXT_MEDIA,
  MEDIA_ONLY,
}

@Schema({ timestamps: true })
export class SubmissionThread {
  static readonly FILE_PATH = 'submissions/threads';

  @Prop({
    required: true,
    ref: Submission.name,
    type: MongoTypes.ObjectId,
  })
  submission: MongoTypes.ObjectId;

  @Prop({
    required: true,
    ref: User.name,
    type: MongoTypes.ObjectId,
  })
  sender: MongoTypes.ObjectId;

  @Prop({})
  textData?: string;

  @Prop({
    type: MediaFile,
  })
  mediaData?: MediaFile;

  @Prop({
    enum: SUBMISSION_THREAD_TYPE,
    default: SUBMISSION_THREAD_TYPE.TEXT_ONLY,
  })
  threadType: SUBMISSION_THREAD_TYPE;

  @Prop({
    type: SubmissionThreadImpressionsData,
  })
  impressions?: SubmissionThreadImpressionsData;
}

export const SubmissionThreadSchema =
  SchemaFactory.createForClass(SubmissionThread);
