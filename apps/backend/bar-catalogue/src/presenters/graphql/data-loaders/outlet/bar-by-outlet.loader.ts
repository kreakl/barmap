import DataLoader from 'dataloader';
import { Bar } from 'apps/backend/bar-catalogue/src/domain/entities';
import { Injectable, Scope } from '@nestjs/common';
import { BarOutletService } from '@catalogue/application/bar-outlet/bar-outlet.service';

@Injectable({ scope: Scope.REQUEST })
export class BarByOutletLoader extends DataLoader<number, Bar> {
  constructor(private readonly outletService: BarOutletService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(barIds: readonly number[]): Promise<Bar[]> {
    return this.outletService.findOutletBarByBatch(barIds);
  }
}
