import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/app/user/schemas/user.schema';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { forbiddenError } from 'src/error/error.functions';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { UserPermissionFactoryService } from 'src/app/permission/user-permission-factory/user-permission-factory.service';
import { AdminPermissionFactoryService } from 'src/app/permission/admin-permission-factory/admin-permission-factory.service';

/**
 * Guard that checks for permission to fetch a user.
 */
@Injectable()
export class ReadOnePermissionGuard implements CanActivate {
  constructor(
    private readonly entityMapperService: EntityMapperService,
    private readonly userPermissionFactory: UserPermissionFactoryService,
    private readonly adminPermissionFactory: AdminPermissionFactoryService,
  ) {}

  getAbility(req: Request) {
    if (req.user instanceof User) {
      return this.userPermissionFactory.create(req.user);
    } else if (req.user instanceof Admin) {
      return this.adminPermissionFactory.create(req.user);
    }

    return null;
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.getAbility(req);

    if (
      ability !== null &&
      ability.can(
        PermissionAction.ReadOne,
        this.entityMapperService.entityToDto(User, req.data.user),
      )
    ) {
      return true;
    }

    throw forbiddenError();
  }
}
