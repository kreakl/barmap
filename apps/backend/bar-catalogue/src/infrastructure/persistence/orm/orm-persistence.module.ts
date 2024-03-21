import { Module } from '@nestjs/common';
import { BarRepository } from '@catalogue/application/ports/bar.repository';
import { BarOrmRepository } from './bar.orm-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddressEntity,
  BarEntity,
  BarOutletEntity,
  BarTypeCategoryEntity,
  BarTypeEntity,
  FranchiseEntity,
} from './entities';
import { StateEntity } from './entities/state.entity';
import {
  AddressMapper,
  BarMapper,
  BarOutletMapper,
  BarTypeCategoryMapper,
  BarTypeMapper,
} from './mapper';
import { StateMapper } from './mapper/state.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BarEntity,
      BarOutletEntity,
      FranchiseEntity,
      BarTypeCategoryEntity,
      BarTypeEntity,
      AddressEntity,
      StateEntity,
    ]),
  ],
  providers: [
    AddressMapper,
    BarMapper,
    BarTypeMapper,
    BarOutletMapper,
    BarTypeCategoryMapper,
    StateMapper,
    {
      provide: BarRepository,
      useClass: BarOrmRepository,
    },
  ],
  exports: [BarRepository],
})
export class OrmPersistenceModule {}
