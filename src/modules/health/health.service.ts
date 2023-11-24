import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

import {
  OracleConnectionFactory,
  OracleOraError,
  OracleOraErrorDescription,
} from '../../infra/database/oracle';
import { MessageDto } from '../../common/dto';

@Injectable()
export class HealthService {
  private logger = new Logger(HealthService.name);
  async healthCheck() {
    try {
      const conn = await new OracleConnectionFactory().createConnection();
      await conn.close();
      return new MessageDto('API is up and running');
    } catch (err) {
      let message = 'API is down';
      const code = err.errorNum;
      console.log(err);
      this.logger.error('healthCheck', code);
      if (code === OracleOraError.ACCESS_DENIED) {
        message = OracleOraErrorDescription[code];
      } else if (code === OracleOraError.SERVER_UNAVAILABLE) {
        throw new ServiceUnavailableException(OracleOraErrorDescription[code]);
      }
      throw new BadGatewayException(message);
    }
  }
}
