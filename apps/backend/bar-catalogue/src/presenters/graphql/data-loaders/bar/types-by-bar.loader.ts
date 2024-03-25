import DataLoader from 'dataloader';
import { BarType } from 'apps/backend/bar-catalogue/src/domain/entities';
import { Injectable, Scope } from '@nestjs/common';
import { BarService } from '@catalogue/application/bar/bar.service';

@Injectable({ scope: Scope.REQUEST })
export class TypesByBarLoader extends DataLoader<number, BarType[]> {
  constructor(private readonly barService: BarService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(barIds: readonly number[]): Promise<BarType[][]> {
    return this.barService.findBarTypesByBatch(barIds);
  }
}
