import { Injectable, Logger } from '@nestjs/common';
import { AdminSeederService } from './admin/admin-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly adminSeederService: AdminSeederService,
  ) {}
  async seed() {
    await this.admins()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }
  async admins() {
    return await Promise.all(this.adminSeederService.create())
      .then((admins) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of admins created : ' +
            // Remove all null values and return only created admins.
            admins.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
