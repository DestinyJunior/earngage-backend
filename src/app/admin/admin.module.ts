import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/app/admin/schemas/admin.schema';
import { AdminRepositoryService } from './admin.repository';
import { EntityMapperService } from 'src/service/entity-mapper/entity-mapper.service';
import { HashService } from 'src/service/hash/hash.service';
import { IsUniqueAdminEmailPipe } from 'src/app/admin/pipes/is-unique-admin-email.pipe';
import { PermissionModule } from 'src/app/permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from 'src/app/file-upload/file.module';
import { S3StorageBucketService } from 'src/service/storage-bucket/s3.storage-bucket.service';
import { IsValidAdminPasswordPipe } from 'src/app/admin/pipes/is-valid-admin-password.pipe';

/**
 * Admin module configurations.
 */
@Module({
  imports: [
    ConfigModule,
    PhotoModule.registerAsync({
      import: [AdminModule],
      inject: [AdminRepositoryService],
      useFactory: (adminRepository: AdminRepositoryService) => ({
        namePrefix: Admin.PHOTO_PATH,
        nameExists: adminRepository.existsByPhotoName.bind(adminRepository),
      }),
    }),
    PermissionModule,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepositoryService,
    IsUniqueAdminEmailPipe,
    IsValidAdminPasswordPipe,
    HashService,
    EntityMapperService,
    S3StorageBucketService,
  ],
  exports: [AdminRepositoryService],
})
export class AdminModule {}
