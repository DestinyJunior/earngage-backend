import { Module } from '@nestjs/common';
import { UserPermissionFactoryService } from './user-permission-factory/user-permission-factory.service';
import { AdminPermissionFactoryService } from './admin-permission-factory/admin-permission-factory.service';

/**
 * Permissions module configuration.
 */
@Module({
  providers: [UserPermissionFactoryService, AdminPermissionFactoryService],
  exports: [UserPermissionFactoryService, AdminPermissionFactoryService],
})
export class PermissionModule {}
