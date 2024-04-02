import { PaginatedQueryParametersDto } from '@bar-map/shared';

export class BarQuery extends PaginatedQueryParametersDto {
  typeIds?: number[];

  constructor(params: BarQuery = {} as BarQuery) {
    const { order, page, pageSize, typeIds } = params;
    super({ order, page, pageSize });

    this.typeIds = typeIds;
  }
}
