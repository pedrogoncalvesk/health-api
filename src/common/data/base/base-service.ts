import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

type PaginateFunction = (
  options?: Record<string, unknown>,
) => Promise<Pagination<any, any> | any[]>;

@Injectable()
export class BaseService {
  constructor(
    private readonly repository: Repository<any> & {
      paginate: PaginateFunction;
    },
  ) {}

  async create(payload: any) {
    const modal = this.repository.create(payload);

    const newModal = await this.repository.save(modal);

    return { ...newModal };
  }

  async findAll(options: Record<string, unknown>) {
    const pagination = await this.repository.paginate(options);

    return pagination;
  }

  async findOne(id: string) {
    const modal = await this.repository.findOneBy({ id });

    if (!modal) {
      throw new NotFoundException('Not found!');
    }

    return { ...modal };
  }

  async update(id: string, payload: any) {
    const modal = await this.findOne(id);
    Object.assign(modal, payload);

    const result = await this.repository.save(modal, { reload: true });

    if (result) {
      return { ...result };
    }

    throw new UnprocessableEntityException('Not updated');
  }

  async remove(id: string) {
    await this.repository.softDelete(id);
  }
}
