import { BaseEntity } from '../../../common/data/base';
import { TaskEntity } from '../../task/entities/task.entity';
import { UserStatusEnum } from '../enums/user-status.enum';

/**
 * Entity user
 */
export class UserEntity extends BaseEntity {
  id: number;
  /** Primary key */
  cpf: string;
  firstName: string;
  lastName: string;
  status: UserStatusEnum;
  profile: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  tasks: TaskEntity[];
}
