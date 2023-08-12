import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsRepository } from './submissions.repository';
import { PermissionModule } from '../permission/permission.module';
import { FileModule } from '../file-upload/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from './schemas/submission.schema';
import { SubmissionThread } from '../threads/schemas/thread.schema';
import { SubmissionThreadRepository } from '../threads/threads.repository';
import { ConfigProviderModule } from 'src/provider/config.provider';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { ThreadsModule } from '../threads/threads.module';

@Module({
  imports: [
    ConfigProviderModule,
    PermissionModule,
    ThreadsModule,
    FileModule.registerAsync({
      import: [ThreadsModule],
      inject: [SubmissionThreadRepository],
      useFactory: (threadRepository: SubmissionThreadRepository) => ({
        namePrefix: SubmissionThread.FILE_PATH,
        nameExists:
          threadRepository.existsUploadByPhotoName.bind(threadRepository),
      }),
    }),
    MongooseModule.forFeature([
      { name: Submission.name, schema: SubmissionSchema },
    ]),
  ],
  controllers: [SubmissionsController],
  providers: [
    SubmissionsService,
    SubmissionsRepository,
    S3StorageBucketService,
    EntityMapperService,
  ],
})
export class SubmissionsModule {}
