import * as path from 'path';
import oracledb = require('oracledb');

import { DatabaseOracleConfig } from '../../config';

/**
 * Connection Factory Oracle
 *
 * autoCommit: true
 */
export class OracleConnectionFactory {
  constructor() {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.autoCommit = true;
  }

  createConnection() {
    const config = new DatabaseOracleConfig().provider;

    return oracledb.getConnection({
      user: config.username,
      password: config.password,
      connectString: config.connectString,
      configDir: path.join(config.extra.configDir),
      walletLocation: path.join(config.extra.walletLocation),
      walletPassword: config.extra.walletPassword,
    });
  }
}
