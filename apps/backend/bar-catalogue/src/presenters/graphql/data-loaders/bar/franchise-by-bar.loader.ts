import DataLoader from 'dataloader';
import { Franchise } from 'apps/backend/bar-catalogue/src/domain/entities';
import { Injectable, Scope } from '@nestjs/common';
import { BarService } from '@catalogue/application/bar/bar.service';

@Injectable({ scope: Scope.REQUEST })
export class FranchiseByBarLoader extends DataLoader<number, Franchise> {
  constructor(private readonly barService: BarService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(barIds: readonly number[]): Promise<Franchise[]> {
    return this.barService.findBarFranchiseByBatch(barIds);
  }
}
