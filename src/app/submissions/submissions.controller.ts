import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserExistsGuard } from '../user/guards/user-exists.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserParam } from 'src/decorator/user-param.decorator';
import { User, UserWithId } from '../user/schemas/user.schema';
import { CampaignExistsGuard } from '../campaign/guards/is-campaign-exists.guard';
import { ResponseDto } from 'src/dto/response.dto';
import { UpdateSubmissionUploadFilesDto } from '../campaign-uploads/dto/create-upload-files.dto';
import { DataParam } from 'src/decorator/data-param.decorator';
import { SubmissionWithId } from './schemas/submission.schema';
import { CreateThreadDto } from '../threads/dto/create-thread.dto';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { SubmissionExistsGuard } from './guards/is-submission-exists.guard';

@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly entityMapperService: EntityMapperService,
  ) {}

  @Post()
  @UseGuards(UserExistsGuard, JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'submissionVideo', maxCount: 1 },
      { name: 'submissionPhoto', maxCount: 1 },
    ]),
  )
  async createSub(
    @UserParam() user: UserWithId,
    @Body() createSubmissionDto: CreateSubmissionDto,
    @UploadedFiles() uploadDto: UpdateSubmissionUploadFilesDto,
  ) {
    await this.submissionsService.create(
      createSubmissionDto.campaign.toString(),
      user.id,
      uploadDto,
    );

    return ResponseDto.success('submission created');
  }

  @Post(':submissionId')
  @UseGuards(UserExistsGuard, JwtAuthGuard, SubmissionExistsGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'submissionPhoto', maxCount: 1 },
      { name: 'submissionPhoto', maxCount: 1 },
    ]),
  )
  async addThread(
    @UserParam() user: User,
    @DataParam('submission') submission: SubmissionWithId,
    @Body() createSubmissionDto: CreateThreadDto,
    @UploadedFiles() uploadDto: UpdateSubmissionUploadFilesDto,
  ) {
    await this.submissionsService.addThreadToSubmission(
      submission,
      user.id,
      createSubmissionDto,
      uploadDto,
    );

    return ResponseDto.success('thread created');
  }

  @Get()
  @UseGuards(UserExistsGuard, JwtAuthGuard)
  async getUserSubmissions(@UserParam() user: User) {
    const submissions =
      await this.submissionsService.findAllLoggedUserSubmissions(user.id);

    return ResponseDto.success('data fetched', submissions);
  }

  @Get('creator/:campaignId')
  @UseGuards(UserExistsGuard, JwtAuthGuard, CampaignExistsGuard)
  async getCampaignSubmissions(
    @Param('campaignId') campaignId: string,
    @UserParam() user: User,
  ) {
    const submissions =
      await this.submissionsService.findCreatorCampaignSubmissions(
        user.id,
        campaignId,
      );

    return ResponseDto.success('data fetched', submissions);
  }

  @Get(':submissionId')
  @UseGuards(UserExistsGuard, JwtAuthGuard, SubmissionExistsGuard)
  async getOneSubmission(@Param('submissionId') submissionId: string) {
    const submission = await this.submissionsService.findOneSubmission(
      submissionId,
    );

    return ResponseDto.success('data fetched', submission);
  }

  @Get(':submissionId/threads')
  @UseGuards(UserExistsGuard, JwtAuthGuard, SubmissionExistsGuard)
  async getSubmissionThreads(@Param('submissionId') submissionId: string) {
    const threads = await this.submissionsService.getSubmissionThreads(
      submissionId,
    );

    return ResponseDto.success('data fetched', threads);
  }
}
