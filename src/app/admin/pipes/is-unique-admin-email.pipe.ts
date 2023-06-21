import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AdminRepositoryService } from 'src/app/admin/admin.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueAdminEmailPipe implements ValidatorConstraintInterface {
  constructor(private readonly adminRepository: AdminRepositoryService) {}

  async validate(email: string) {
    return !(await this.adminRepository.existsByEmail(email));
  }
}

/**
 * Decorator function for above custom validator.
 */
export function IsUniqueAdminEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueAdminEmailPipe,
    });
  };
}
