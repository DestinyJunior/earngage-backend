export type UpdateUploadFilesDto = {
  campaignCover: Express.MulterS3.File[];
  campaignVideo: Express.MulterS3.File[];
};
