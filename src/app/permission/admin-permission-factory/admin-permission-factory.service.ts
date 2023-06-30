import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility, Subjects } from 'src/app/permission/subject.type';
import { AdminRole } from 'src/app/admin/schemas/admin-role.enum';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { User } from 'src/app/user/schemas/user.schema';
import { Admin } from 'src/app/admin/schemas/admin.schema';
@Injectable()
export class AdminPermissionFactoryService {
  create(admin: Admin) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    can(
      PermissionAction.Update,
      Admin,
      ['firstName', 'lastName', 'email', 'password', 'bio', 'photo'],
      { id: admin.id },
    );

    can([PermissionAction.ReadOne, PermissionAction.Read], Admin);

    can(PermissionAction.Manage, User);

    if (admin.role === AdminRole.SUPER_ADMIN) {
      can(PermissionAction.Create, Admin);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
