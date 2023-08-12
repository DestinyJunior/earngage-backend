import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/app/user/schemas/user.schema';
import { forbiddenError } from 'src/error/error.functions';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { UserPermissionFactoryService } from 'src/app/permission/user-permission-factory/user-permission-factory.service';

/**
 * Guard that checks for permission to update a user email.
 */
@Injectable()
export class UpdateEmailPermissionGuard implements CanActivate {
  constructor(
    private readonly entityMapperService: EntityMapperService,
    private readonly userPermissionFactory: UserPermissionFactoryService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability =
      req.user instanceof User
        ? this.userPermissionFactory.create(req.user)
        : null;

    if (
      ability !== null &&
      ability.can(
        PermissionAction.Update,
        this.entityMapperService.entityToDto(User, req.data.user),
        'email',
      )
    ) {
      return true;
    }

    throw forbiddenError();
  }
}
