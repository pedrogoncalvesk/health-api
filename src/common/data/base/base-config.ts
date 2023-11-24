import {
  ConfigFactory,
  ConfigFactoryKeyHost,
  ConfigObject,
  registerAs,
} from '@nestjs/config';

export abstract class BaseConfig<
  TConfig extends ConfigObject,
  TFactory extends ConfigFactory = ConfigFactory<TConfig>,
> {
  private readonly _token: string;
  private readonly _config: () => TConfig;
  private readonly _configFactory: TFactory;

  constructor(readonly key: string, readonly config: () => TConfig) {
    this._token = key;
    this._config = config;
    this._configFactory = config as TFactory;
  }

  registerAs(): TFactory & ConfigFactoryKeyHost<ReturnType<TFactory>> {
    return registerAs(this._token, this._configFactory);
  }

  get provider() {
    return this._config();
  }
}
