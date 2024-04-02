import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarType, BarTypeCategory } from '@catalogue/domain/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(BarTypeCategory)
    private readonly categoryRepository: Repository<BarTypeCategory>,
  ) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  mapEntriesToIds(
    categories: readonly BarTypeCategory[],
    categoryIds: readonly number[],
    relation: keyof BarTypeCategory,
  ) {
    const entriesMap = new Map(
      categories.map((category) => [category.id, category[relation]]),
    );

    return categoryIds.map((id) => entriesMap.get(id));
  }

  async findCategoryTypesByBatch(categoryIds: readonly number[]) {
    const categoriesWithTypes = await this.categoryRepository.find({
      select: {
        id: true,
      },
      relations: {
        barTypes: true,
      },
      where: {
        id: In(categoryIds),
      },
    });

    return this.mapEntriesToIds(
      categoriesWithTypes,
      categoryIds,
      'barTypes',
    ) as BarType[][];
  }
}
