import { Mapper } from '@bar-map/shared';
import { AddressEntity } from '@catalogue/infrastructure/persistence/orm/entities';
import {
  Address,
  City,
  Street,
} from '@catalogue/domain/aggregates/bar-aggregate';
import { Location } from '@catalogue/domain/aggregates/bar-aggregate';

import { Injectable } from '@nestjs/common';
import { StateMapper } from './state.mapper';

@Injectable()
export class AddressMapper implements Mapper<Address, AddressEntity> {
  constructor(private readonly stateMapper: StateMapper) {}

  toPersistence(address: Address): AddressEntity {
    const entity = new AddressEntity();
    entity.id = address.id;
    entity.street = address.street.value;
    entity.location = {
      type: 'Point',
      coordinates: [...address.location.value.coordinates],
    };
    entity.city = address.city.value;
    entity.state = this.stateMapper.toPersistence(address.state);

    return entity;
  }

  toDomain(entity: AddressEntity): Address {
    const address = new Address();
    address.id = entity.id;
    address.street = new Street(entity.street);
    address.location = new Location({
      type: 'Point',
      coordinates: [...entity.location.coordinates],
    });
    address.city = new City(entity.city);
    address.state = this.stateMapper.toDomain(entity.state);

    return address;
  }
}
