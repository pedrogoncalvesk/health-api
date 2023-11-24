import { Injectable } from '@nestjs/common';

import { MessageDto, PageDto, PageOptionsDto } from '../../../common/dto';
import { GetTaskModel } from '../models/get-task.model';
import { GetTaskDto, PostTaskDto, PutTaskDto } from '../dto';

@Injectable()
export abstract class ITaskUsecase {
  /**
   * Get task by id
   */
  abstract getTaskById(id: string): Promise<GetTaskModel>;

  /**
   * Get tasks
   */
  abstract getTasks(
    query: GetTaskDto,
    pagination?: PageOptionsDto,
  ): Promise<PageDto<GetTaskModel>>;

  /**
   * Save task
   */
  abstract postTask(body: PostTaskDto): Promise<MessageDto>;

  /**
   * Update task
   */
  abstract putTask(body: PutTaskDto): Promise<MessageDto>;

  /**
   * Delete task
   */
  abstract deleteTask(id: string): Promise<MessageDto>;
}
