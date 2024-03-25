import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BarService } from '@catalogue/application/bar/bar.service';
import {
  Bar,
  BarOutlet,
  BarType,
  Franchise,
} from 'apps/backend/bar-catalogue/src/domain/entities';
import { ParseIntPipe } from '@nestjs/common';
import {
  FranchiseByBarLoader,
  OutletsByBarLoader,
  TypesByBarLoader,
} from '@catalogue/presenters/graphql/data-loaders/bar';

@Resolver(() => Bar)
export class BarResolver {
  constructor(
    private readonly franchiseLoader: FranchiseByBarLoader,
    private readonly typesLoader: TypesByBarLoader,
    private readonly outletsLoader: OutletsByBarLoader,
    private readonly barService: BarService,
  ) {}

  @Query(() => [Bar], { name: 'bars' })
  async findAll() {
    return this.barService.findAll();
  }

  @Query(() => Bar, { name: 'bar' })
  public async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ) {
    return this.barService.findById(id);
  }

  @ResolveField('outlets', () => [BarOutlet])
  async getBarOutlets(@Parent() bar: Bar) {
    return this.outletsLoader.load(bar.id);
  }

  @ResolveField('types', () => [BarType])
  async getBarTypes(@Parent() bar: Bar) {
    return this.typesLoader.load(bar.id);
  }

  @ResolveField('franchise', () => Franchise)
  async getBarFranchise(@Parent() bar: Bar) {
    return this.franchiseLoader.load(bar.id);
  }
}
