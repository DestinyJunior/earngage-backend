export type UpdateUploadFilesDto = {
  campaignCover: Express.MulterS3.File[];
  campaignVideo: Express.MulterS3.File[];
};

export type UpdateSampleVideosDto = {
  sampleOne?: Express.MulterS3.File[];
  sampleTwo?: Express.MulterS3.File[];
  sampleThree?: Express.MulterS3.File[];
  sampleFour?: Express.MulterS3.File[];
  sampleFive?: Express.MulterS3.File[];
};
