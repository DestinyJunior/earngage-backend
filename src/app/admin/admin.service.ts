import { Injectable } from '@nestjs/common';
import { AdminRepositoryService } from 'src/app/admin/admin.repository';
import { AdminRole } from 'src/app/admin/schemas/admin-role.enum';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { HashService } from 'src/service/hash/hash.service';
import { StorageBucketService } from 'src/service/storage-bucket/storage-bucket.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

/**
 * Service class that handles admin system logic.
 */
@Injectable()
export class AdminService {
  constructor(
    private readonly hashService: HashService,
    private readonly adminRepository: AdminRepositoryService,
    private readonly storageBucketService: StorageBucketService,
  ) {}

  /**
   * Handles creating of an admin.
   */
  async create(createAdminDto: CreateAdminDto) {
    createAdminDto.password = await this.hashService.hashPassword(
      createAdminDto.password,
    );

    return this.adminRepository.create({
      role: createAdminDto?.role || AdminRole.ADMIN,
      ...createAdminDto,
    });
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: string) {
    return this.adminRepository.findById(id);
  }

  /**
   * Handles update of an admin.
   */
  async update(
    admin: Admin,
    updateAdminDto: UpdateAdminDto,
    // photoDto: Express.MulterS3.File,
  ) {
    // const oldPhotoKey = admin.photo?.name;

    // if (photoDto !== undefined) {
    //   updateAdminDto.photo = {
    //     name: photoDto.key,
    //     size: photoDto.size,
    //     url: photoDto.location,
    //     mimetype: photoDto.mimetype,
    //   };
    // }

    await this.adminRepository.update(admin.id, updateAdminDto);

    // if (photoDto !== undefined && oldPhotoKey !== undefined) {
    //   await this.storageBucketService.deletePhoto(oldPhotoKey);
    // }

    return this.adminRepository.findById(admin.id);
  }

  /**
   * Handles update of an admin's email.
   */
  async updateEmail(admin: Admin, email: string) {
    await this.adminRepository.updateEmail(admin.id, email);
    return this.adminRepository.findById(admin.id);
  }

  /**
   * Handles admin password update.
   */
  async updatePassword(admin: Admin, password: string) {
    password = await this.hashService.hashPassword(password);
    await this.adminRepository.updatePassword(admin.id, password);
    return this.adminRepository.findById(admin.id);
  }
}
