import DataLoader from 'dataloader';
import { Address } from 'apps/backend/bar-catalogue/src/domain/entities';
import { Injectable, Scope } from '@nestjs/common';
import { BarOutletService } from '@catalogue/application/bar-outlet/bar-outlet.service';

@Injectable({ scope: Scope.REQUEST })
export class AddressByOutletLoader extends DataLoader<number, Address> {
  constructor(private readonly outletService: BarOutletService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(barIds: readonly number[]): Promise<Address[]> {
    return this.outletService.findOutletAddressByBatch(barIds);
  }
}
