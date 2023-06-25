import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositoryService } from 'src/app/user/user-repository/user-repository.service';

/**
 * Custom validator that checks if provided password reset token is expired.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsNotExpiredPasswordResetTokenPipe
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepositoryService) {}

  async validate(token: string) {
    const authToken = await this.userRepository.findAuthTokenByUser(token);

    return (
      authToken !== null &&
      !authToken.used &&
      authToken.expiresAt.getTime() > Date.now()
    );
  }
}

/**
 * Decorator function for custom validator.
 */
export function IsNotExpiredPasswordResetToken(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotExpiredPasswordResetTokenPipe,
    });
  };
}
