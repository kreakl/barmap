import { PaginatedQueryParametersDto } from '@bar-map/shared';

export class BarOutletQuery extends PaginatedQueryParametersDto {
  typeIds?: number[];

  constructor(params: BarOutletQuery = {} as BarOutletQuery) {
    const { order, page, pageSize, typeIds } = params;
    super({ order, page, pageSize });

    this.typeIds = typeIds;
  }
}
