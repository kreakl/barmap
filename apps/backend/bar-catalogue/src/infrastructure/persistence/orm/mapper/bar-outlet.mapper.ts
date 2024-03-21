import { BarOutlet } from '@catalogue/domain/aggregates/bar-aggregate';
import { BarOutletEntity } from '../entities/bar-outlet.entity';
import { Mapper } from '@bar-map/shared';
import { Injectable } from '@nestjs/common';
import { AddressMapper } from './address.mapper';
import { BarEntity } from '@catalogue/infrastructure/persistence/orm/entities';

@Injectable()
export class BarOutletMapper implements Mapper<BarOutlet, BarOutletEntity> {
  constructor(private readonly addressMapper: AddressMapper) {}

  toPersistence(outlet: BarOutlet): BarOutletEntity {
    const entity = new BarOutletEntity();
    entity.id = outlet.id;
    entity.address = this.addressMapper.toPersistence(outlet.address);
    entity.pictureUrl = outlet.pictureUrl;
    entity.phoneNumber = outlet.phoneNumber.value;
    entity.bar = new BarEntity();
    entity.bar.id = outlet.barId;

    return entity;
  }
  toDomain(record: BarOutletEntity): BarOutlet {
    const outlet = new BarOutlet();
    outlet.id = record.id;
    outlet.pictureUrl = record.pictureUrl;
    outlet.address = this.addressMapper.toDomain(record.address);
    outlet.barId = record.bar.id;

    return outlet;
  }
}
