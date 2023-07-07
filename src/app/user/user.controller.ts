import {
  Controller,
  Get,
  Post,
  Body,
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
import { ReadOnePermissionGuard } from 'src/app/user/guards/read-one-permission.guard';
import { UpdateUserProfile } from 'src/app/user/dto/update-user-profile.dto';
import { UpdateUserPermissionGuard } from 'src/app/user/guards/update-user-permission.guard';
import { UpdateUserPhotosDto } from 'src/app/user/dto/update-user-photos.dto';
import { UserParam } from 'src/decorator/user-param.decorator';
import { SetUserAccountTypeDto } from './dto/create-user-type.dto';

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
  @Post('set-account-type')
  @UseGuards(UserExistsGuard, JwtAuthGuard)
  async setUserType(
    @UserParam() user: User,
    @Body() setAccountTypeDto: SetUserAccountTypeDto,
  ) {
    await this.userService.setUserAccount(user, setAccountTypeDto);

    return ResponseDto.success('User account updated');
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
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }], {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
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
