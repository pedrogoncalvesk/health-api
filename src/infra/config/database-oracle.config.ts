import { BaseConfig } from '../../common/data/base';

const databaseOracleConfigProvider: () => DatabaseOracleConfigType = () => ({
  username: process.env.DATABASE_ORACLE_USERNAME,
  password: process.env.DATABASE_ORACLE_PASSWORD,
  connectString: process.env.DATABASE_ORACLE_CONNECT_STRING,
  extra: {
    configDir: process.env.DATABASE_ORACLE_WALLET_PATH,
    walletLocation: process.env.DATABASE_ORACLE_WALLET_PATH,
    walletPassword: process.env.DATABASE_ORACLE_WALLET_PASSWORD,
  },
});

export type DatabaseOracleConfigType = {
  username: string;
  password: string;
  connectString: string;
  extra: {
    configDir: string;
    walletLocation: string;
    walletPassword: string;
  };
};

export const DATABASE_ORACLE_CONFIG_KEY = 'databaseOracleConfig';

/**
 * Database Oracle Config
 */
export class DatabaseOracleConfig extends BaseConfig<DatabaseOracleConfigType> {
  constructor() {
    super(DATABASE_ORACLE_CONFIG_KEY, databaseOracleConfigProvider);
  }
}
