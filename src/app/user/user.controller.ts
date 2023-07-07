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
import { ResponseDto } from 'src/dto/response.dto';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { DataParam } from 'src/decorator/data-param.decorator';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
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
