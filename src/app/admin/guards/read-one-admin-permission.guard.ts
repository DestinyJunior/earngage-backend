import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { forbiddenError } from 'src/error/error.functions';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { AdminPermissionFactoryService } from 'src/app/permission/admin-permission-factory/admin-permission-factory.service';

@Injectable()
export class ReadOneAdminPermissionGuard implements CanActivate {
  constructor(
    private readonly entityMapperService: EntityMapperService,
    private readonly adminPermissionFactory: AdminPermissionFactoryService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability =
      req.user instanceof Admin
        ? this.adminPermissionFactory.create(req.user)
        : null;

    if (
      ability !== null &&
      ability.can(
        PermissionAction.ReadOne,
        this.entityMapperService.mongooseEntityToClass(Admin, req.data.admin),
      )
    ) {
      return true;
    }

    throw forbiddenError();
  }
}
