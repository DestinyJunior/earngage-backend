import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositoryService } from 'src/app/user/user-repository/user-repository.service';

/**
 * Custom validator that checks if provided email exists.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidEmailPipe implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepositoryService) {}

  validate(email: string) {
    return this.userRepository.existsByEmail(email);
  }
}

/**
 * Decorator function for above custom validator.
 */
export function IsValidEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidEmailPipe,
    });
  };
}
