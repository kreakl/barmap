import { Mapper } from '@bar-map/shared';
import { Bar, BarName } from '@catalogue/domain/aggregates/bar-aggregate';
import { BarEntity } from '@catalogue/infrastructure/persistence/orm/entities';
import { Injectable } from '@nestjs/common';
import { BarTypeMapper } from './bar-type.mapper';
import { FranchiseEntity } from '@catalogue/infrastructure/persistence/orm/entities';
import { BarOutletMapper } from './bar-outlet.mapper';

@Injectable()
export class BarMapper implements Mapper<Bar, BarEntity> {
  constructor(
    private readonly barCategoryMapper: BarTypeMapper,
    private readonly outletMapper: BarOutletMapper,
  ) {}

  toPersistence(bar: Bar): BarEntity {
    const entity = new BarEntity();
    entity.id = bar.id;
    entity.name = bar.name.value;
    entity.description = bar.description;
    entity.franchise = new FranchiseEntity();
    entity.franchise.id = bar.franchiseId;
    entity.logoUrl = bar.logoUrl;
    entity.typeList = bar.typeList.map(this.barCategoryMapper.toPersistence);
    entity.outletList = bar.outletList.map(this.outletMapper.toPersistence);

    return entity;
  }
  toDomain(record: BarEntity): Bar {
    const bar = new Bar();
    bar.id = record.id;
    bar.name = new BarName(record.name);
    bar.description = record.description;
    bar.franchiseId = record.franchise.id;
    bar.typeList = record.typeList.map(this.barCategoryMapper.toDomain);
    bar.outletList = record.outletList.map(this.outletMapper.toDomain);
    bar.logoUrl = record.logoUrl;

    return bar;
  }
}
