import { isLessThan } from 'tiny-types';
import {
  ensure,
  isGreaterThan,
  isString,
  Predicate,
  property,
  TinyTypeOf,
} from 'tiny-types';
import { State } from './state.value-object';
import { Location } from './location.value-object';

export class Address {
  id: number;
  street: Street;
  city: City;
  location: Location;
  state: State;
}

export class Street extends TinyTypeOf<string>() {
  constructor(public readonly street: string) {
    super(street);
    ensure(
      'Street',
      street,
      isString(),
      property('length', isGreaterThan(2)),
      property('length', isLessThan(100)),
      Predicate.to('not be empty', (value) => value !== ''),
    );
  }
}

export class City extends TinyTypeOf<string>() {
  constructor(public readonly city: string) {
    super(city);
    ensure(
      'City',
      city,
      isString(),
      property('length', isGreaterThan(2)),
      property('length', isLessThan(100)),
      Predicate.to('not be empty', (value) => value !== ''),
    );
  }
}
