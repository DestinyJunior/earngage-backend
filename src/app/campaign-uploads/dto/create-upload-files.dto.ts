export type UpdateUploadFilesDto = {
  campaignCover: Express.MulterS3.File[];
  campaignVideo: Express.MulterS3.File[];
};

export type UpdateSubmissionUploadFilesDto = {
  submissionVideo?: Express.MulterS3.File[];
  submissionPhoto?: Express.MulterS3.File[];
};
