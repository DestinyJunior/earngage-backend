import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepositoryService } from 'src/app/admin/admin.repository';
import { Admin, AdminSchema } from 'src/app/admin/schemas/admin.schema';
import { HashService } from 'src/service/hash/hash.service';
import { AdminSeederService } from './admin-seeder.service';

/**
 * Import and provide seeder classes for languages.
 *
 * @module
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [AdminSeederService, AdminRepositoryService, HashService],
  exports: [AdminSeederService],
})
export class AdminSeederModule {}
