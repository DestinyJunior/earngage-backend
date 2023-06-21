import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AdminDocument } from 'src/app/admin/schemas/admin.schema';
import { REQUEST } from 'src/interceptor/inject-request-into-validation.interceptor';
import { HashService } from 'src/service/hash/hash.service';

/**
 * Custom validator that checks if provided password is correct for auth admin.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidAdminPasswordPipe implements ValidatorConstraintInterface {
  constructor(private readonly hashService: HashService) {}

  async validate(password: string, args: ValidationArguments) {
    const admin = args.object[REQUEST].admin as AdminDocument;

    if (password === undefined || password === null) {
      return false;
    }

    return this.hashService.comparePassword(password, admin.password);
  }
}

/**
 * Decorator function for the above custom validator.
 */
export function IsValidAdminPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidAdminPasswordPipe,
    });
  };
}
