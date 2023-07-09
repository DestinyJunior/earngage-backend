import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminDto } from 'src/app/admin/dto/admin.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { CreateAdminPermissionGuard } from 'src/app/admin/guards/create-admin-permission.guard';
import { AdminExistsGuard } from 'src/app/admin/guards/admin-exists.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAdminPermissionGuard } from 'src/app/admin/guards/update-admin-permission.guard';
import { DataParam } from 'src/decorator/data-param.decorator';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { ReadOneAdminPermissionGuard } from 'src/app/admin/guards/read-one-admin-permission.guard';
import { InjectRequestIntoValidationInterceptor } from 'src/interceptor/inject-request-into-validation.interceptor';
import { UpdateAdminPasswordDto } from 'src/app/admin/dto/update-admin-password.dto';
import { UpdateAdminEmailDto } from 'src/app/admin/dto/update-admin-email.dto';
import { UserParam } from 'src/decorator/user-param.decorator';

/**
 * Controller for handling admin requests.
 */
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly entityMapperService: EntityMapperService,
  ) {}

  /**
   * Handles creating of an admin.
   */
  @Post()
  @UseGuards(JwtAuthGuard, CreateAdminPermissionGuard)
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.create(createAdminDto);

    return ResponseDto.success(
      'Admin created',
      this.entityMapperService.entityToDto(AdminDto, admin),
    );
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  /**
   * Handles fetching an admin using the id.
   */
  @Get(':id')
  @UseGuards(AdminExistsGuard, JwtAuthGuard, ReadOneAdminPermissionGuard)
  findOne(@DataParam('admin') admin: Admin) {
    return ResponseDto.success(
      'Admin fetched',
      this.entityMapperService.entityToDto(AdminDto, admin),
    );
  }

  @Get('admin-profile')
  @UseGuards(AdminExistsGuard, JwtAuthGuard, ReadOneAdminPermissionGuard)
  findOneAdminProfile(@UserParam() admin: Admin) {
    return ResponseDto.success(
      'Admin fetched',
      this.entityMapperService.entityToDto(AdminDto, admin),
    );
  }

  /**
   * Handles update of an admin.
   */
  @Put('update-admin-profile')
  @UseInterceptors(FileInterceptor('photo'))
  @UseGuards(AdminExistsGuard, JwtAuthGuard, UpdateAdminPermissionGuard)
  async update(
    @UserParam() admin: Admin,
    @Body() updateAdminDto: UpdateAdminDto,
    // @UploadedFile() photoDto: Express.MulterS3.File,
  ) {
    const updatedAdmin = await this.adminService.update(
      admin,
      updateAdminDto,
      // photoDto,
    );

    return ResponseDto.success(
      'Admin updated',
      this.entityMapperService.mongooseEntityToClass(AdminDto, updatedAdmin),
    );
  }

  /**
   * Handles update of an admin email.
   */
  @Put('email')
  @UseGuards(AdminExistsGuard, JwtAuthGuard, UpdateAdminPermissionGuard)
  async updateEmail(
    @UserParam() admin: Admin,
    @Body() updateAdminDto: UpdateAdminEmailDto,
  ) {
    const updatedAdmin = await this.adminService.updateEmail(
      admin,
      updateAdminDto.email,
    );

    return ResponseDto.success(
      'Admin email updated',
      this.entityMapperService.entityToDto(AdminDto, updatedAdmin),
    );
  }

  /**
   * Handles admin password update.
   */
  @Put('password')
  @UseInterceptors(InjectRequestIntoValidationInterceptor)
  @UseGuards(AdminExistsGuard, JwtAuthGuard, UpdateAdminPermissionGuard)
  async updatePassword(
    @UserParam() admin: Admin,
    @Body() updateAdminDto: UpdateAdminPasswordDto,
  ) {
    const updatedAdmin = await this.adminService.updatePassword(
      admin,
      updateAdminDto.password,
    );

    return ResponseDto.success(
      'Admin password updated',
      this.entityMapperService.mongooseEntityToClass(AdminDto, updatedAdmin),
    );
  }
}
