import {
  Repository,
  SearchOptions,
} from '@bar-map/shared/application/ports/repository.abstract';
import { FindOptionsWhere, ObjectId, Repository as ORMRepository } from 'typeorm';
import { Mapper } from '@bar-map/shared/infrastructure/persistence/mappers/mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeORMRepository<Entity, Model extends { id: ID }, ID extends string | number | Date | ObjectId | FindOptionsWhere<Model> | string[] | number[] | Date[] | ObjectId[] = number>
  implements Repository<Entity, ID>
{
  constructor(
    protected readonly repository: ORMRepository<Model>,
    protected readonly mapper: Mapper<Entity, Model>
  ) {}

  findOne: (options?: SearchOptions) => Promise<Entity>;

  async findById(id: ID) {
    const result = await this.repository.findOne({
      where: {
        id,
      } as FindOptionsWhere<Model>,
    });

    return result ? this.mapper.toDomain(result) : null;
  }

  async deleteMany() {
    return this.repository.clear();
  }

  async findAll() {
    const result = await this.repository.find();

    return result.map(this.mapper.toDomain);
  }

  async insert(entity: Entity) {
    const mappedEntity = this.mapper.toPersistence(entity);
    const result = await this.repository.save(mappedEntity);

    return this.mapper.toDomain(result);
  }

  async updateById(id: ID, entity: Entity) {
    const mappedEntity = this.mapper.toPersistence(entity);
    mappedEntity.id = id;

    const result = await this.repository.save(mappedEntity);

    return this.mapper.toDomain(result);
  }

  async deleteById(id: ID) {
    const result = await this.repository.delete(id);

    return !!result.affected;
  }
}
