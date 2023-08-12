import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { Model, UpdateQuery } from 'mongoose';
import { MgFilterQuery } from 'src/types/mongoose.types';
import { Types as MongoTypes } from 'mongoose';

@Injectable()
export class SubmissionsRepository {
  constructor(
    @InjectModel(Submission.name)
    private submissionModel: Model<SubmissionDocument>,
  ) {}
  create(createSubmissionDto: CreateSubmissionDto) {
    return this.submissionModel.create(createSubmissionDto);
  }

  findAll(params: MgFilterQuery<Submission>) {
    return this.submissionModel.find(params).sort('-createdAt');
  }

  findOne(params: MgFilterQuery<Submission>) {
    return this.findOne(params);
  }

  findById(id: MongoTypes.ObjectId) {
    return this.submissionModel.findById(id);
  }

  update(id: MongoTypes.ObjectId, payload: UpdateQuery<Submission>) {
    return this.submissionModel.findByIdAndUpdate(id, payload);
  }

  remove(id: MongoTypes.ObjectId) {
    return this.submissionModel.findByIdAndDelete(id);
  }
}
