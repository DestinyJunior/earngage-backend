import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Types as MongoTypes } from 'mongoose';
import { notFoundError } from 'src/error/error.functions';
import { SubmissionsRepository } from '../submissions.repository';

/**
 * Guard that checks if requested Submission exists and adds it to the request.data property.
 */
@Injectable()
export class SubmissionExistsGuard implements CanActivate {
  constructor(private readonly submissionRepository: SubmissionsRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    if (!MongoTypes.ObjectId.isValid(req.params.submissionId)) {
      throw notFoundError('Submission invalid');
    }

    const submission = await this.submissionRepository.findById(
      new MongoTypes.ObjectId(req.params.submissionId),
    );

    if (submission === null) {
      throw notFoundError('Submission do not exist');
    }

    req.data.submission = submission;

    return true;
  }
}
