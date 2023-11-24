import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { BaseConfig } from '../../common/data/base';
import { DatabaseOracleConfig } from './database-oracle.config';
import { ServiceEntity } from '../../modules/service/entities/service.entity';

const databaseTypeOrmConfigProvider: () => DatabaseTypeOrmConfigType = () => ({
  type: 'oracle',
  logging: process.env.DATABASE_LOGGING === 'true' ? ['error'] : false,
  // logging: process.env.DATABASE_LOGGING === 'true',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  autoLoadEntities: process.env.DATABASE_AUTO_LOAD_ENTITIES === 'true',
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
  entities: [ServiceEntity],
  ...new DatabaseOracleConfig().provider,
});

export type DatabaseTypeOrmConfigType = TypeOrmModuleOptions;

export const DATABASE_TYPEORM_CONFIG_KEY = 'databaseTypeOrmConfig';

/**
 * Database TypeOrm Config
 */
export class DatabaseTypeOrmConfig extends BaseConfig<DatabaseTypeOrmConfigType> {
  constructor() {
    super(DATABASE_TYPEORM_CONFIG_KEY, databaseTypeOrmConfigProvider);
  }
}
