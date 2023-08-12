/**
 * Defines data & user property type for the request object.
 */
declare namespace Express {
  type User =
    | import('./app/user/schemas/user.schema').UserDocument
    | import('./app/admin/schemas/admin.schema').AdminDocument;

  export interface Request {
    user?: User;
    data: {
      user: import('./app/user/schemas/user.schema').UserDocument;
      admin: import('./app/admin/schemas/admin.schema').AdminDocument;
      media: import('./app/file-upload/schemas/file.schema').PhotoDocument;
      campaign: import('./app/campaign/schemas/campaign.schema').CampaignDocument;
      submission: import('./app/submissions/schemas/submission.schema').CampaignDocument;
    };
  }
}
