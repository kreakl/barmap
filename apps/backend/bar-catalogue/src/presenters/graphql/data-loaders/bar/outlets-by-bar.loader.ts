import DataLoader from 'dataloader';
import { BarOutlet } from 'apps/backend/bar-catalogue/src/domain/entities';
import { Injectable, Scope } from '@nestjs/common';
import { BarService } from '@catalogue/application/bar/bar.service';

@Injectable({ scope: Scope.REQUEST })
export class OutletsByBarLoader extends DataLoader<number, BarOutlet[]> {
  constructor(private readonly barService: BarService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(barIds: readonly number[]): Promise<BarOutlet[][]> {
    return this.barService.findBarOutletsByBatch(barIds);
  }
}
