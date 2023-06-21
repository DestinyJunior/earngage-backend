import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserExistsGuard } from './guards/user-exists.guard';
import { User } from './schemas/user.schema';
import { UpdateUserEmailVerifiedDto } from './dto/update-user-email-verified.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { InjectRequestIntoValidationInterceptor } from 'src/interceptor/inject-request-into-validation.interceptor';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { DataParam } from 'src/decorator/data-param.decorator';
import { UpdateUserPasswordDto } from 'src/app/user/dto/update-user-password.dto';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { UpdatePasswordPermissionGuard } from 'src/app/user/guards/update-password-permission.guard';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UpdateEmailPermissionGuard } from 'src/app/user/guards/update-email-permission.guard';
import { ReadOnePermissionGuard } from 'src/app/user/guards/read-one-permission.guard';
import { UpdateUserProfile } from 'src/app/user/dto/update-user-profile.dto';
import { UpdateUserPermissionGuard } from 'src/app/user/guards/update-user-permission.guard';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';
import { UpdateUserPhotosDto } from 'src/app/user/dto/update-user-photos.dto';
import { UserParam } from 'src/decorator/user-param.decorator';

/**
 * Controller for handling user requests.
 */
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly entityMapperService: EntityMapperService,
  ) {}

  /**
   * Handles creating of user.
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return ResponseDto.success(
      'User created',
      this.entityMapperService.entityToDto(UserDto, user),
    );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Handles fetching a user using the users id.
   */
  @Get(':id')
  @UseGuards(UserExistsGuard, JwtAuthGuard, ReadOnePermissionGuard)
  findOne(@DataParam('user') user: User) {
    return ResponseDto.success(
      'User fetched',
      this.entityMapperService.entityToDto(UserDto, user),
    );
  }

  /**
   * Handles update of a user.
   */
  @Put('update-profile')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @UseGuards(UserExistsGuard, JwtAuthGuard, UpdateUserPermissionGuard)
  async update(
    @UserParam() user: User,
    @Body() updateUserDto: UpdateUserProfile,
    @UploadedFiles() photoDto: UpdateUserPhotosDto,
  ) {
    const updatedUser = await this.userService.update(
      user,
      updateUserDto,
      photoDto,
    );

    return ResponseDto.success(
      'User updated',
      this.entityMapperService.entityToDto(UserDto, updatedUser),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  /**
   * Handles email verification of user.
   */
  @Put('email-verified')
  @UseGuards(UserExistsGuard)
  @UseInterceptors(InjectRequestIntoValidationInterceptor)
  async updateEmailVerified(
    @UserParam() user: User,
    @Body() userUpdateDto: UpdateUserEmailVerifiedDto, //This does not do anything after token validation.
  ) {
    const updatedUser = await this.userService.updateEmailVerified(
      user,
      userUpdateDto !== null,
    );

    return ResponseDto.success(
      'User email verified',
      this.entityMapperService.entityToDto(UserDto, updatedUser),
    );
  }

  /**
   * Handles user password update.
   */
  @Put('password')
  @UseGuards(UserExistsGuard, JwtAuthGuard, UpdatePasswordPermissionGuard)
  @UseInterceptors(InjectRequestIntoValidationInterceptor)
  async updatePassword(
    @UserParam() user: User,
    @Body() userUpdateDto: UpdateUserPasswordDto,
  ) {
    const updatedUser = await this.userService.updatePassword(
      user,
      userUpdateDto.password,
    );

    return ResponseDto.success(
      'User password updated',
      this.entityMapperService.entityToDto(UserDto, updatedUser),
    );
  }

  /**
   * Handles update of user email.
   */
  @Put('email')
  @UseGuards(UserExistsGuard, JwtAuthGuard, UpdateEmailPermissionGuard)
  async updateEmail(
    @UserParam() user: User,
    @Body() userUpdateDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateEmail(
      user,
      userUpdateDto.email,
    );

    return ResponseDto.success(
      'User email updated',
      this.entityMapperService.entityToDto(UserDto, updatedUser),
    );
  }

  /**
   * Handles update and resend of email verification token.
   */
  @Put('email-verification-token')
  @UseGuards(UserExistsGuard)
  async updateEmailVerificationToken(@UserParam() user: User) {
    const updatedUser = await this.userService.updateEmailVerificationToken(
      user,
    );

    return ResponseDto.success(
      'User email verification token updated',
      this.entityMapperService.entityToDto(UserDto, updatedUser),
    );
  }

  @Get('my-profile')
  @HttpCode(200)
  @UseGuards(UserExistsGuard, JwtAuthGuard, ReadOnePermissionGuard)
  findOneUserProfile(@UserParam() user: User) {
    return ResponseDto.success(
      'User fetched',
      this.entityMapperService.entityToDto(UserDto, user),
    );
  }
}
