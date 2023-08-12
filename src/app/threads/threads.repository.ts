import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SubmissionThread,
  SubmissionThreadDocument,
} from './schemas/thread.schema';
import { Model } from 'mongoose';
import { CreateThreadDto } from './dto/create-thread.dto';

@Injectable()
export class SubmissionThreadRepository {
  constructor(
    @InjectModel(SubmissionThread.name)
    private submissionThreadModel: Model<SubmissionThreadDocument>,
  ) {}

  create(createSubmissionDto: CreateThreadDto) {
    return this.submissionThreadModel.create(createSubmissionDto);
  }

  findAll(submission: string) {
    return this.submissionThreadModel.find({ submission });
  }

  /**
   * Checks if a submission thread uploads entity with a media name exists.
   */
  async existsUploadByPhotoName(fileName: string) {
    const upload = await this.submissionThreadModel
      .findOne({ 'mediaData.name': fileName })
      .exec();
    return upload !== null;
  }
}
