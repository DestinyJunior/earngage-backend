import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CampaignRepository } from '../campaign.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueCampaignTitlePipe implements ValidatorConstraintInterface {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async validate(title: string) {
    return !(await this.campaignRepository.existsByTitle(title));
  }
}

/**
 * Decorator function for above custom validator.
 */
export function IsUniqueCampaignTitle(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueCampaignTitlePipe,
    });
  };
}
