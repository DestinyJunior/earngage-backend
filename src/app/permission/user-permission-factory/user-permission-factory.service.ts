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
import { Campaign } from 'src/app/campaign/schemas/campaign.schema';
import { UserType } from 'src/app/user/schemas/user-type.enum';

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
      ['firstName', 'lastName', 'email', 'bio', 'country'],
      { id: user.id },
    );

    if (user.accountType === UserType.CREATOR) {
      can(
        [
          PermissionAction.Read,
          PermissionAction.ReadOne,
          PermissionAction.Update,
          PermissionAction.Delete,
        ],
        Campaign,
      );
    }

    if (user.accountType === UserType.INFLUENCER) {
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
