import { Allow, IsEnum, IsNotEmpty } from 'class-validator';
import { Types as MongoTypes } from 'mongoose';
import { SUBMISSION_THREAD_TYPE } from '../schemas/thread.schema';
import { MediaFile } from 'src/app/file-upload/schemas/file.schema';

export class CreateThreadDto {
  @Allow()
  submission: MongoTypes.ObjectId;

  @Allow()
  sender: MongoTypes.ObjectId;

  @Allow()
  @IsEnum(SUBMISSION_THREAD_TYPE)
  threadType?: number;

  @IsNotEmpty()
  textData?: string;

  @Allow()
  mediaData?: MediaFile;

  @Allow()
  impressions?: any;
}
