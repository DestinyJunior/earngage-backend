import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { REQUEST } from 'src/interceptor/inject-request-into-validation.interceptor';
import { UserDocument } from '../schemas/user.schema';
import { UserRepositoryService } from '../user-repository/user-repository.service';

/**
 * Custom validator that checks if provided email verification token belongs to auth user.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidEmailVerificationTokenPipe
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepositoryService) {}

  async validate(token: string, args: ValidationArguments) {
    const user = args.object[REQUEST].user as UserDocument;

    const fetchedUser = await this.userRepository.findByEmailVerificationToken(
      token,
    );

    return fetchedUser !== null && fetchedUser.id === user.id;
  }
}

/**
 * Decorator function for above custom validator.
 */
export function IsValidEmailVerificationToken(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidEmailVerificationTokenPipe,
    });
  };
}
