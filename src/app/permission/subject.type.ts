import { InferSubjects, MongoAbility } from '@casl/ability';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { User } from 'src/app/user/schemas/user.schema';
import { BecomeAPartner } from '../partner/schemas/partner.schema';
import { Bootcamp } from '../bootcamp/schemas/bootcamp.schema';
import { BootcampRegistration } from '../bootcamp-registration/schemas/bootcamp-registration.schema';

/**
 * Permission subjects type definition.
 */
export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Admin
      | typeof BecomeAPartner
      | typeof Bootcamp
      | typeof BootcampRegistration
    >
  | 'all';

export type AppAbility = MongoAbility<[PermissionAction, Subjects]>;
