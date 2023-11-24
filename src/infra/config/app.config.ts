import { BaseConfig } from '../../common/data/base';

const appConfigProvider: () => AppConfigType = () => ({
  env: process.env.NODE_ENV || 'local',
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
});

export type AppConfigType = {
  env: string;
  port: number;
};

export const APP_CONFIG_KEY = 'appConfig';

/**
 * Database TypeOrm Oracle Config
 */
export class AppConfig extends BaseConfig<AppConfigType> {
  constructor() {
    super(APP_CONFIG_KEY, appConfigProvider);
  }
}
