import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositoryService } from 'src/app/user/user-repository/user-repository.service';

/**
 * Custom validator that checks if provided password reset token exists.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidPasswordResetTokenPipe
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepositoryService) {}

  validate(token: string) {
    return this.userRepository.existsByResetPasswordToken(token);
  }
}

/**
 * Decorator function for above Custom validator.
 */
export function IsValidPasswordResetToken(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordResetTokenPipe,
    });
  };
}
