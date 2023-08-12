import { Module } from '@nestjs/common';
import { SubmissionThreadRepository } from './threads.repository';
import {
  SubmissionThread,
  SubmissionThreadSchema,
} from './schemas/thread.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmissionThread.name, schema: SubmissionThreadSchema },
    ]),
  ],
  providers: [SubmissionThreadRepository],
  exports: [SubmissionThreadRepository],
})
export class ThreadsModule {}
