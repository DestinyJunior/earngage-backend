import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Types as MongoTypes } from 'mongoose';
import { notFoundError } from 'src/error/error.functions';
import jwtDecode from 'jwt-decode';
import { UserRepositoryService } from '../user-repository/user-repository.service';
/**
 * Guard that checks if requested user exists and adds it to the request.data property.
 */
@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization;
    const payload = jwtDecode(token);

    if (!MongoTypes.ObjectId.isValid(payload['sub'])) {
      throw notFoundError('User do not exist');
    }

    const user = await this.userRepository.findById(payload['sub']);

    if (user === null) {
      throw notFoundError('User do not exist');
    }

    req.data.user = user;

    return true;
  }
}
