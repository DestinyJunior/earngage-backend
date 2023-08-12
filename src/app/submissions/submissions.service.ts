import { Injectable } from '@nestjs/common';
import { SubmissionsRepository } from './submissions.repository';
import { SubmissionThreadRepository } from '../threads/threads.repository';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';
import { UpdateSubmissionUploadFilesDto } from '../campaign-uploads/dto/create-upload-files.dto';
import { CreateThreadDto } from '../threads/dto/create-thread.dto';
import { SUBMISSION_THREAD_TYPE } from '../threads/schemas/thread.schema';
import { Types as MongoTypes } from 'mongoose';
import { SubmissionWithId } from './schemas/submission.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly submissionRepository: SubmissionsRepository,
    private readonly submissionThreadsRepository: SubmissionThreadRepository,
    private readonly entityMapperService: EntityMapperService,
    private readonly awsS3StorageBucketService: S3StorageBucketService,
  ) {}

  async create(
    campaignId: string,
    userId: string,
    submissionUploads: UpdateSubmissionUploadFilesDto,
  ) {
    const submissionVideoUploaded =
      submissionUploads?.submissionVideo !== undefined &&
      submissionUploads.submissionVideo.length > 0;

    const submissionPictureUploaded =
      submissionUploads?.submissionPhoto !== undefined &&
      submissionUploads.submissionPhoto.length > 0;

    const submission = await this.submissionRepository.create({
      campaign: new MongoTypes.ObjectId(campaignId),
      user: new MongoTypes.ObjectId(userId),
    });

    if (submissionVideoUploaded) {
      const submissionVideo = this.entityMapperService.multerFileToPhoto(
        submissionUploads.submissionVideo[0],
      );

      await this.submissionThreadsRepository.create({
        sender: submission.user,
        submission: submission._id,
        threadType: SUBMISSION_THREAD_TYPE.MEDIA_ONLY,
        mediaData: submissionVideo,
      });
    }

    if (submissionPictureUploaded) {
      const submissionPhoto = this.entityMapperService.multerFileToPhoto(
        submissionUploads.submissionPhoto[0],
      );

      await this.submissionThreadsRepository.create({
        sender: submission.user,
        submission: submission._id,
        threadType: SUBMISSION_THREAD_TYPE.MEDIA_ONLY,
        mediaData: submissionPhoto,
      });
    }

    return true;
  }

  async addThreadToSubmission(
    submission: SubmissionWithId,
    userId: string,
    createThreads: CreateThreadDto,
    submissionUploads: UpdateSubmissionUploadFilesDto,
  ) {
    if (
      createThreads?.threadType &&
      createThreads.threadType === SUBMISSION_THREAD_TYPE.TEXT_ONLY
    ) {
      //

      await this.submissionThreadsRepository.create({
        sender: new MongoTypes.ObjectId(userId),
        submission: submission._id,
        threadType: createThreads.threadType,
        textData: createThreads.textData,
      });

      // end
    } else if (
      createThreads?.threadType &&
      createThreads.threadType === SUBMISSION_THREAD_TYPE.MEDIA_ONLY
    ) {
      // start
      const submissionVideoUploaded =
        submissionUploads?.submissionVideo !== undefined &&
        submissionUploads.submissionVideo.length > 0;

      const submissionPictureUploaded =
        submissionUploads?.submissionPhoto !== undefined &&
        submissionUploads.submissionPhoto.length > 0;

      if (submissionVideoUploaded) {
        const submissionVideo = this.entityMapperService.multerFileToPhoto(
          submissionUploads.submissionVideo[0],
        );

        await this.submissionThreadsRepository.create({
          sender: new MongoTypes.ObjectId(userId),
          submission: submission._id,
          threadType: createThreads.threadType,
          mediaData: submissionVideo,
        });
      }

      if (submissionPictureUploaded) {
        const submissionPhoto = this.entityMapperService.multerFileToPhoto(
          submissionUploads.submissionPhoto[0],
        );

        await this.submissionThreadsRepository.create({
          sender: new MongoTypes.ObjectId(userId),
          submission: submission._id,
          threadType: createThreads.threadType,
          mediaData: submissionPhoto,
        });
      }

      // end
    } else if (
      createThreads?.threadType &&
      createThreads.threadType === SUBMISSION_THREAD_TYPE.TEXT_MEDIA
    ) {
      // start
      const submissionVideoUploaded =
        submissionUploads?.submissionVideo !== undefined &&
        submissionUploads.submissionVideo.length > 0;

      const submissionPictureUploaded =
        submissionUploads?.submissionPhoto !== undefined &&
        submissionUploads.submissionPhoto.length > 0;

      if (submissionVideoUploaded) {
        const submissionVideo = this.entityMapperService.multerFileToPhoto(
          submissionUploads.submissionVideo[0],
        );

        await this.submissionThreadsRepository.create({
          sender: new MongoTypes.ObjectId(userId),
          submission: submission._id,
          threadType: createThreads.threadType,
          mediaData: submissionVideo,
          textData: createThreads.textData,
        });
      }

      if (submissionPictureUploaded) {
        const submissionPhoto = this.entityMapperService.multerFileToPhoto(
          submissionUploads.submissionPhoto[0],
        );

        await this.submissionThreadsRepository.create({
          sender: new MongoTypes.ObjectId(userId),
          submission: submission._id,
          threadType: createThreads.threadType,
          mediaData: submissionPhoto,
          textData: createThreads.textData,
        });
      }

      // end
    }

    return true;
  }

  findAllLoggedUserSubmissions(user: string) {
    return this.submissionRepository.findAll({ user });
  }

  findCreatorCampaignSubmissions(creator: string, campaign: string) {
    return this.submissionRepository.findAll({ creator, campaign });
  }

  findOneSubmission(subId: string) {
    return this.submissionRepository.findById(new MongoTypes.ObjectId(subId));
  }

  async getSubmissionThreads(submissionId: string) {
    return await this.submissionThreadsRepository.findAll(submissionId);
  }
}
