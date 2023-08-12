import { InferSubjects, MongoAbility } from '@casl/ability';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { PermissionAction } from 'src/app/permission/permission-action.enum';
import { User } from 'src/app/user/schemas/user.schema';
import { Campaign } from '../campaign/schemas/campaign.schema';
import { CampaignBudget } from '../campaign-budget/schemas/campaign-budget.schemas';
import { CampaignUpload } from '../campaign-uploads/schemas/campaign-upload.schema';

/**
 * Permission subjects type definition.
 */
export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Admin
      | typeof Campaign
      | typeof CampaignBudget
      | typeof CampaignUpload
      | typeof Admin
    >
  | 'all';

export type AppAbility = MongoAbility<[PermissionAction, Subjects]>;
