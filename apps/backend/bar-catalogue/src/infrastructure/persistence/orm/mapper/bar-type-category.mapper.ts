import { Mapper } from '@bar-map/shared';
import {
  CategoryName,
  BarTypeCategory,
} from '@catalogue/domain/aggregates/bar-aggregate';
import { BarTypeCategoryEntity } from '../entities/bar-type-category.entity';
import { Injectable } from '@nestjs/common';
import { BarTypeMapper } from './bar-type.mapper';

@Injectable()
export class BarTypeCategoryMapper
  implements Mapper<BarTypeCategory, BarTypeCategoryEntity>
{
  constructor(private readonly categoryMapper: BarTypeMapper) {}

  toPersistence(type: BarTypeCategory): BarTypeCategoryEntity {
    const entity = new BarTypeCategoryEntity();
    entity.id = type.id;
    entity.name = type.name.value;
    entity.barTypeList = type.barTypeList.map(
      this.categoryMapper.toPersistence,
    );
    return entity;
  }

  toDomain(record: BarTypeCategoryEntity): BarTypeCategory {
    const category = new BarTypeCategory();
    category.id = record.id;
    category.name = new CategoryName(record.name);
    category.barTypeList = record.barTypeList.map(this.categoryMapper.toDomain);

    return category;
  }
}
