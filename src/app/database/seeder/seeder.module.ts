import { Logger, Module } from '@nestjs/common';
import { AdminSeederModule } from './admin/admin-seeder.module';
import { Seeder } from './seeder';
import { ConfigProviderModule } from 'src/provider/config.provider';
import { MongoDatabaseProviderModule } from 'src/provider/db/mongo-provider.module';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigProviderModule,
    MongoDatabaseProviderModule,
    AdminSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
