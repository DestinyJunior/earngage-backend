import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Types as MongoTypes } from 'mongoose';
import { AdminService } from 'src/app/admin/admin.service';
import { notFoundError } from 'src/error/error.functions';
import jwtDecode from 'jwt-decode';

/**
 * Guard that checks if requested admin exists and adds it to the request.data property.
 */
@Injectable()
export class AdminExistsGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization;
    const payload = jwtDecode(token);

    if (!MongoTypes.ObjectId.isValid(payload['sub'])) {
      throw notFoundError('Admin do not exist');
    }

    const admin = await this.adminService.findOne(payload['sub']);

    if (admin === null) {
      throw notFoundError('Admin do not exist');
    }

    req.data.admin = admin;

    return true;
  }
}
