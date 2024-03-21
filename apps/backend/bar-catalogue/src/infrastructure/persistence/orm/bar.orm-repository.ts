import { TypeORMRepository } from '@bar-map/shared';
import { Bar } from '@catalogue/domain/aggregates/bar-aggregate';
import { BarEntity } from './entities/bar.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarMapper } from './mapper/bar.mapper';

@Injectable()
export class BarOrmRepository
  extends TypeORMRepository<Bar, BarEntity>
  implements BarOrmRepository
{
  constructor(
    @InjectRepository(BarEntity)
    protected readonly repository: Repository<BarEntity>,
    protected readonly mapper: BarMapper,
  ) {
    super(repository, mapper);
  }
}
