import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { REQUEST } from 'src/interceptor/inject-request-into-validation.interceptor';
import { HashService } from 'src/service/hash/hash.service';
import { UserDocument } from 'src/app/user/schemas/user.schema';

/**
 * Custom validator that checks if provided password is correct for auth user.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidPasswordPipe implements ValidatorConstraintInterface {
  constructor(private readonly hashService: HashService) {}

  async validate(password: string, args: ValidationArguments) {
    const user = args.object[REQUEST].user as UserDocument;

    if (user.password === undefined) {
      return true;
    }

    if (password === undefined || password === null) {
      return false;
    }

    return this.hashService.comparePassword(password, user.password);
  }
}

/**
 * Decorator function for the above custom validator.
 */
export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordPipe,
    });
  };
}
