import { Injectable } from '@nestjs/common';
import { AdminRepositoryService } from 'src/app/admin/admin.repository';
import { Admin as IAdmin } from 'src/app/admin/schemas/admin.schema';
import { HashService } from 'src/service/hash/hash.service';
import { admins } from './admin-data';

/**
 * Service dealing with admin based operations.
 *
 * @class
 */
@Injectable()
export class AdminSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Admin>} adminRepository
   */
  constructor(
    private readonly adminRepository: AdminRepositoryService,
    private readonly hashService: HashService,
  ) {}
  /**
   * Seed all admins.
   *
   * @function
   */
  create(): Array<Promise<IAdmin>> {
    return admins.map(async (admin: IAdmin) => {
      return await this.adminRepository
        .findByEmail(admin.email)
        .then(async (dbAdmin) => {
          // We check if a admin already exists.
          // If it does don't create a new one.
          if (dbAdmin) {
            return Promise.resolve(null);
          }
          admin.password = await this.hashService.hashString(admin.password);
          return Promise.resolve(await this.adminRepository.create(admin));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
