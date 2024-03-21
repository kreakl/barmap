import { Address } from './address';
import { PhoneNumber } from '@catalogue/domain/aggregates/bar-aggregate/phone-number.value-object';

export class BarOutlet {
  id: number;
  address: Address;
  barId: number;
  pictureUrl: string;
  phoneNumber: PhoneNumber;
}
