import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Types as MongoTypes } from 'mongoose';
import { notFoundError } from 'src/error/error.functions';
import { CampaignRepository } from '../campaign.repository';

/**
 * Guard that checks if requested campaign exists and adds it to the request.data property.
 */
@Injectable()
export class CampaignExistsGuard implements CanActivate {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    if (!MongoTypes.ObjectId.isValid(req.params.campaignId)) {
      throw notFoundError('Campaign invalid');
    }

    const campaign = await this.campaignRepository.findOne(
      new MongoTypes.ObjectId(req.params.campaignId),
    );

    if (campaign === null) {
      throw notFoundError('Campaign do not exist');
    }

    req.data.campaign = campaign;

    return true;
  }
}
