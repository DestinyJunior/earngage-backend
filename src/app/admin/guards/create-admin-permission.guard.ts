import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { forbiddenError } from 'src/error/error.functions';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { AdminPermissionFactoryService } from 'src/app/permission/admin-permission-factory/admin-permission-factory.service';

/**
 * Guard that checks for permission to create an admin.
 */
@Injectable()
export class CreateAdminPermissionGuard implements CanActivate {
  constructor(
    private readonly adminPermissionFactory: AdminPermissionFactoryService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability =
      req.user instanceof Admin
        ? this.adminPermissionFactory.create(req.user)
        : null;

    if (ability !== null && ability.can(PermissionAction.Create, Admin)) {
      return true;
    }

    throw forbiddenError();
  }
}
