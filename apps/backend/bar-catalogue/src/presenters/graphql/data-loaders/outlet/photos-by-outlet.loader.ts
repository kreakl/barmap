import DataLoader from 'dataloader';
import { Photo } from 'apps/backend/bar-catalogue/src/domain/entities';
import { Injectable, Scope } from '@nestjs/common';
import { BarOutletService } from '@catalogue/application/bar-outlet/bar-outlet.service';

@Injectable({ scope: Scope.REQUEST })
export class PhotosByOutletLoader extends DataLoader<number, Photo[]> {
  constructor(private readonly outletService: BarOutletService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(barIds: readonly number[]): Promise<Photo[][]> {
    return this.outletService.findOutletPhotosByBatch(barIds);
  }
}
