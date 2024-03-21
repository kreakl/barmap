import {
  ensure,
  isEqualTo,
  isGreaterThan,
  isLessThan,
  isString,
  Predicate,
  property,
  TinyType,
  TinyTypeOf,
} from 'tiny-types';

export class State extends TinyType {
  constructor(
    public readonly stateName: StateName,
    public readonly isoAlphaCode2: StateIsoAlphaCode2,
  ) {
    super();
  }
}

export class StateName extends TinyTypeOf<string>() {
  constructor(public readonly name: string) {
    super(name);
    ensure(
      'StateName',
      name,
      isString(),
      property('length', isGreaterThan(2)),
      property('length', isLessThan(100)),
      Predicate.to('not be empty', (value) => value !== ''),
    );
  }
}

export class StateIsoAlphaCode2 extends TinyTypeOf<string>() {
  constructor(public readonly code: string) {
    super(code);
    ensure(
      'StateIsoAlphaCode2',
      code,
      isString(),
      property('length', isEqualTo(2)),
      Predicate.to('not be empty', (value) => value !== ''),
    );
  }
}
