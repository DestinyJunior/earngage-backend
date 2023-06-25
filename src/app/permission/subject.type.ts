import { InferSubjects, MongoAbility } from '@casl/ability';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { User } from 'src/app/user/schemas/user.schema';

/**
 * Permission subjects type definition.
 */
export type Subjects = InferSubjects<typeof User | typeof Admin> | 'all';

export type AppAbility = MongoAbility<[PermissionAction, Subjects]>;
