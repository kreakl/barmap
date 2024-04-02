import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BarType, BarTypeCategory } from '@catalogue/domain/entities';
import { CategoryService } from '@catalogue/application/category/category.service';
import { TypesByCategoryLoader } from '@catalogue/presenters/graphql/data-loaders/category';

@Resolver(() => BarTypeCategory)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly typesLoader: TypesByCategoryLoader,
  ) {}
  @Query(() => [BarTypeCategory], { name: 'barCategories' })
  async findAll() {
    return this.categoryService.findAll();
  }

  @ResolveField('types', () => [BarType])
  async getCategoryTypes(@Parent() category: BarTypeCategory) {
    return this.typesLoader.load(category.id);
  }
}
