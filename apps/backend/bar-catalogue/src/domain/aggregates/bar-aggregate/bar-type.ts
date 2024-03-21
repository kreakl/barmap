import { ensure, Predicate, TinyTypeOf } from 'tiny-types';

export class BarType {
  id: number;
  name: BarTypeName;
}

export class BarTypeName extends TinyTypeOf<string>() {
  constructor(public readonly name: string) {
    super(name);
    ensure(
      'BarTypeName',
      name,
      Predicate.to('not be empty', (value) => value !== ''),
    );
  }
}
