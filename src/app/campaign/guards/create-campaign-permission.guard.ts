import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { UserPermissionFactoryService } from 'src/app/permission/user-permission-factory/user-permission-factory.service';
import { forbiddenError } from 'src/error/error.functions';
import { Campaign } from '../schemas/campaign.schema';

@Injectable()
export class CreateCampaignPermissionGuard implements CanActivate {
  constructor(
    private readonly userPermissionFactory: UserPermissionFactoryService,
  ) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const ability = this.userPermissionFactory.create(req.user as any);

    if (ability.can(PermissionAction.Create, Campaign)) {
      return true;
    }

    throw forbiddenError();
  }
}
