import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarType, BarTypeCategory } from '@catalogue/domain/entities';
import { CategoryService } from '@catalogue/application/category/category.service';
import { CategoryResolver } from '@catalogue/presenters/graphql/category.resolver';
import { TypesByCategoryLoader } from '@catalogue/presenters/graphql/data-loaders/category';

@Module({
  imports: [TypeOrmModule.forFeature([BarTypeCategory, BarType])],
  providers: [CategoryService, CategoryResolver, TypesByCategoryLoader],
})
export class CategoryModule {}
