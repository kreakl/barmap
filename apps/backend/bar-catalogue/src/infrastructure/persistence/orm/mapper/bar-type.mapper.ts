import { Injectable } from '@nestjs/common';
import { Mapper } from '@bar-map/shared';
import {
  BarType,
  BarTypeName,
} from '@catalogue/domain/aggregates/bar-aggregate';
import { BarTypeEntity } from '../entities/bar-type.entity';

@Injectable()
export class BarTypeMapper implements Mapper<BarType, BarTypeEntity> {
  toPersistence(category: BarType): BarTypeEntity {
    const entity = new BarTypeEntity();
    entity.id = category.id;
    entity.name = category.name.value;

    return entity;
  }

  toDomain(record: BarTypeEntity): BarType {
    const category = new BarType();
    category.id = record.id;
    category.name = new BarTypeName(record.name);

    return category;
  }
}
