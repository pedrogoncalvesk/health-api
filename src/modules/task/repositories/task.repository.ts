import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BaseOracleRepository } from '../../../common/data/oracle';
import { APP_CONFIG_KEY, AppConfigType } from '../../../infra/config';
import { TaskEntity } from '../entities/task.entity';
import { TaskMapper } from '../mapper/task.mapper';
import { TaskMetadata, TaskMetadataType } from './task.metadata';

@Injectable()
export class TaskRepository extends BaseOracleRepository<
  TaskEntity,
  TaskMetadataType
> {
  constructor(private readonly configService: ConfigService) {
    super(
      new TaskMetadata(),
      new TaskMapper(),
      configService.get<AppConfigType>(APP_CONFIG_KEY).env,
    );
  }
}
