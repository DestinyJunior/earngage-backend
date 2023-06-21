import { Logger, Module } from '@nestjs/common';
import { ConfigProviderModule } from 'src/providers/app/config-provider.module';
import { DatabaseProviderModule } from 'src/providers/database/database-provider.module';
import { AdminSeederModule } from './admin/admin-seeder.module';
import { Seeder } from './seeder';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [ConfigProviderModule, DatabaseProviderModule, AdminSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
