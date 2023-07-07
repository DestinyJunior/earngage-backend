import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositoryService } from '../user-repository/user-repository.service';

/**
 * Custom validator that checks if provided username exists.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueUsernamePipe implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async validate(username: string, args: ValidationArguments) {
    const user = await this.userRepository.findByUsername(username);
    args.object['user'] = user;
    return user === null || user.phoneNumber === undefined;
  }
}

/**
 * Decorator function for above custom validator.
 */
export function IsUniqueUsername(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueUsernamePipe,
    });
  };
}
