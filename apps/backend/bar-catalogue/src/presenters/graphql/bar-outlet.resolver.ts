import {
  AddressByOutletLoader,
  BarByOutletLoader,
  PhotosByOutletLoader,
} from '@catalogue/presenters/graphql/data-loaders/outlet';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Address, Bar, BarOutlet, Photo } from '@catalogue/domain/entities';
import { BarOutletService } from '@catalogue/application/bar-outlet/bar-outlet.service';
import { ParseIntPipe } from '@nestjs/common';
import { PaginatedBarOutletDto } from '@catalogue/presenters/graphql/dto';
import { BarOutletQueryArgs } from '@catalogue/presenters/graphql/dto/bar-outlet/query-bar-outlet.args';

@Resolver(() => BarOutlet)
export class BarOutletResolver {
  constructor(
    private readonly addressLoader: AddressByOutletLoader,
    private readonly barLoader: BarByOutletLoader,
    private readonly photosLoader: PhotosByOutletLoader,
    private readonly outletService: BarOutletService,
  ) {}

  @Query(() => PaginatedBarOutletDto, { name: 'outlets' })
  async findAll(@Args() outletParams: BarOutletQueryArgs) {
    const paginatedOutlets = await this.outletService.findAll(outletParams);

    return new PaginatedBarOutletDto(paginatedOutlets);
  }

  @Query(() => BarOutlet, { name: 'outlet' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.outletService.findById(id);
  }

  @ResolveField('bar', () => Bar)
  async getOutletBar(@Parent() outlet: BarOutlet) {
    return this.barLoader.load(outlet.id);
  }

  @ResolveField('address', () => Address)
  async getOutletAddress(@Parent() outlet: BarOutlet) {
    return this.addressLoader.load(outlet.id);
  }

  @ResolveField('photos', () => [Photo])
  async getOutletPhotos(@Parent() outlet: BarOutlet) {
    return this.photosLoader.load(outlet.id);
  }
}
