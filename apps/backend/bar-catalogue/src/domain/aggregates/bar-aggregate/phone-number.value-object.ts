import {
  ensure,
  isDefined,
  isInRange,
  matches,
  property,
  TinyTypeOf,
} from 'tiny-types';

export class PhoneNumber extends TinyTypeOf<string>() {
  constructor(public phone: string) {
    super(phone);
    ensure(
      'PhoneNumber',
      phone,
      isDefined(),
      property('length', isInRange(11, 12)),
      matches(
        /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/im,
      ),
    );
  }
}
