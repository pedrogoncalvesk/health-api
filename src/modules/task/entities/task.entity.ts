import { BaseEntity } from '../../../common/data/base';

/**
 * Entity API001_TSK
 */
export class TaskEntity extends BaseEntity {
  id: string; //guid
  name: string;
  description: string;
  userId: number;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
