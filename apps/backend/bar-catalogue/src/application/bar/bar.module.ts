import { Module } from '@nestjs/common';
import { BarService } from '@catalogue/application/bar/bar.service';
import { BarResolver } from '@catalogue/presenters/graphql/bar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Address,
  Bar,
  BarOutlet,
  BarType,
  BarTypeCategory,
  Franchise, Photo,
  State
} from '@catalogue/domain/entities';
import {
  FranchiseByBarLoader,
  OutletsByBarLoader,
  TypesByBarLoader,
} from '@catalogue/presenters/graphql/data-loaders/bar';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bar,
      Address,
      BarOutlet,
      Franchise,
      BarType,
      BarTypeCategory,
      State,
      Photo,
    ]),
  ],
  providers: [
    BarService,
    BarResolver,
    FranchiseByBarLoader,
    OutletsByBarLoader,
    TypesByBarLoader,
  ],
})
export class BarModule {}
