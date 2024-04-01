import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Address,
  Bar,
  BarOutlet,
  BarType,
  Franchise,
  Photo,
  State,
} from '@catalogue/domain/entities';
import {
  AddressByOutletLoader,
  PhotosByOutletLoader,
  BarByOutletLoader,
} from '@catalogue/presenters/graphql/data-loaders/outlet';
import { BarOutletService } from '@catalogue/application/bar-outlet/bar-outlet.service';
import { BarOutletResolver } from '@catalogue/presenters/graphql/bar-outlet.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bar,
      Address,
      BarOutlet,
      Franchise,
      BarType,
      State,
      Photo,
    ]),
  ],
  providers: [
    BarOutletService,
    BarOutletResolver,
    AddressByOutletLoader,
    PhotosByOutletLoader,
    BarByOutletLoader,
  ],
})
export class BarOutletModule {}
