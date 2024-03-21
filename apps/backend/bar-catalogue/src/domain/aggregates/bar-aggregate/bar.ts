import { BarType } from './bar-type';
import {
  ensure,
  isGreaterThan,
  isLessThan,
  isString,
  Predicate,
  property,
  TinyTypeOf,
} from 'tiny-types';
import { BarOutlet } from './bar-outlet';
import { PhoneNumber } from '@catalogue/domain/aggregates/bar-aggregate/phone-number.value-object';

export class Bar {
  id: number;
  name: BarName;
  description?: string;
  typeList: BarType[];
  outletList: BarOutlet[];
  phoneNumber: PhoneNumber;
  franchiseId: number;
  logoUrl: string;

  addBarCategory(category: BarType) {
    this.typeList.push(category);
  }

  addBarOutlet(outlet: BarOutlet) {
    this.outletList.push(outlet);
  }
}

export class BarName extends TinyTypeOf<string>() {
  constructor(public readonly name: string) {
    super(name);
    ensure(
      'BarName',
      name,
      isString(),
      property('length', isGreaterThan(2)),
      property('length', isLessThan(100)),
      Predicate.to('not be empty', (value) => value !== ''),
    );
  }
}
