import { ensure, Predicate, TinyTypeOf } from 'tiny-types';
import { BarType } from './bar-type';

export class BarTypeCategory {
  id: number;
  name: CategoryName;
  barTypeList: BarType[];
}

export class CategoryName extends TinyTypeOf<string>() {
  constructor(public readonly name: string) {
    super(name);
    ensure(
      'CategoryName',
      name,
      Predicate.to('not be empty', (value) => value !== ''),
    );
  }
}
