import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { CategoryService } from '@catalogue/application/category/category.service';
import { BarType } from '@catalogue/domain/entities';

@Injectable({ scope: Scope.REQUEST })
export class TypesByCategoryLoader extends DataLoader<number, BarType[]> {
  constructor(private readonly categoryService: CategoryService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    categoryIds: readonly number[],
  ): Promise<BarType[][]> {
    return this.categoryService.findCategoryTypesByBatch(categoryIds);
  }
}
