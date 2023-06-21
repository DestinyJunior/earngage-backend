import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import mongoose from 'mongoose';
import { notFoundError } from 'src/error/error.functions';
import { UserService } from 'src/app/user/user.service';
import jwtDecode from 'jwt-decode';
/**
 * Guard that checks if requested user exists and adds it to the request.data property.
 */
@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization;
    const payload = jwtDecode(token);

    if (!mongoose.Types.ObjectId.isValid(payload['sub'])) {
      throw notFoundError('User do not exist');
    }

    const user = await this.userService.findOne(payload['sub']);

    if (user === null) {
      throw notFoundError('User do not exist');
    }

    req.data.user = user;

    return true;
  }
}
