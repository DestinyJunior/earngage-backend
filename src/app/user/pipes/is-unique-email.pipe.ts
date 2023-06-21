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
 * Custom validator that checks if provided email exists.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueEmailPipe implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async validate(email: string, args: ValidationArguments) {
    const user = await this.userRepository.findByEmail(email);
    args.object['user'] = user;
    return user === null || user.password === undefined;
  }
}

/**
 * Decorator function for above custom validator.
 */
export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailPipe,
    });
  };
}
