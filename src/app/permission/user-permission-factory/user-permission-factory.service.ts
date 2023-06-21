import {
  PureAbility,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility, Subjects } from 'src/app/permission/subject.type';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { User } from 'src/app/user/schemas/user.schema';

/**
 * Permission definitions.
 */
@Injectable()
export class UserPermissionFactoryService {
  create(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    can(
      [PermissionAction.Update, PermissionAction.ReadOne],
      User,
      [
        'firstName',
        'lastName',
        'email',
        'password',
        'bio',
        'yearOfExperience',
        'jobRole',
        'country',
      ],
      { id: user.id },
    );

    // for sample user data owner
    // can<UserData & { 'user.id': UserData['user']['id'] }>(
    //   [
    //     PermissionAction.Update,
    //     PermissionAction.ReadOne,
    //     PermissionAction.Read,
    //     PermissionAction.Delete,
    //   ],
    //   [UserData],
    //   { 'user.id': user.id },
    // );

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
