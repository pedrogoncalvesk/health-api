import { DynamicModule, Provider, SetMetadata } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { ServiceEntity } from '../entities/service.entity';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

export function CustomRepository(entity: EntityClassOrSchema): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}

@CustomRepository(ServiceEntity)
export class ServiceRepository extends Repository<ServiceEntity> {
  async paginate(
    options: Record<string, any> & Partial<IPaginationOptions>,
  ): Promise<Pagination<ServiceEntity> | ServiceEntity[]> {
    const { paginate: isPaginate, page, route, limit, ...filter } = options;

    const where = [];

    Object.keys(filter).forEach((key) => {
      where.push({
        [key]: filter[key],
      });
    });

    const isPaginateBool = !(isPaginate === 'false' || isPaginate === false);
    let result: any;

    if (!isPaginateBool) {
      result = await this.findBy(where);
    } else {
      result = await paginate<ServiceEntity>(
        this,
        {
          page: page || 1,
          limit: limit || 10,
          route: route || '',
        },
        {
          where,
        },
      );
    }

    const items = (!isPaginateBool ? result : result.items).map((item) => ({
      ...item,
      id: (item.id as any).toString('hex'),
    }));

    return !isPaginateBool ? items : { ...result, items };
  }

  override async findOne(options) {
    const result: any = await this.manager.findOne(
      this.metadata.target,
      options,
    );

    return result
      ? { ...result, id: (result.id as any).toString('hex') }
      : result;
  }

  override async findOneBy(where) {
    const result: any = await this.manager.findOneBy(
      this.metadata.target,
      where,
    );

    return result
      ? { ...result, id: (result.id as any).toString('hex') }
      : result;
  }
}

export class TypeOrmExModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(
        TYPEORM_EX_CUSTOM_REPOSITORY,
        repository,
      );

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }
}
