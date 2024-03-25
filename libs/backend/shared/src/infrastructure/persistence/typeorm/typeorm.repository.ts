import {
  Repository,
  SearchOptions,
} from '@bar-map/shared/application/ports/repository.abstract';
import { FindOptionsWhere, Repository as ORMRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TypeORMId } from './types';

@Injectable()
export class TypeORMRepository<
  Model extends { id: TypeORMId<Model> },
  ID extends Model['id'] = Model['id'],
> implements Repository<Model, ID>
{
  constructor(protected readonly repository: ORMRepository<Model>) {}

  findOne: (options?: SearchOptions) => Promise<Model>;

  async findById(id: ID) {
    return await this.repository.findOne({
      where: {
        id,
      } as unknown as FindOptionsWhere<Model>,
    });
  }

  async deleteMany() {
    return this.repository.clear();
  }

  async findAll() {
    return await this.repository.find();
  }

  async insert(entity: Model) {
    return await this.repository.save(entity);
  }

  async updateById(id: ID, entity: Model) {
    entity.id = id;
    return await this.repository.save(entity);
  }

  async deleteById(id: ID) {
    const result = await this.repository.delete(id);

    return !!result.affected;
  }
}
