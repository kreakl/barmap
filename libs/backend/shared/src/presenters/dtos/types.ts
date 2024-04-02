import { PaginatedQueryParametersDto } from './paginated-query-parameters.dto';

export interface PaginatedDtoParameters {
  paginatedParams: Partial<PaginatedQueryParametersDto>;
  itemCount: number;
}

export interface IPaginatedType<T> {
  readonly data: readonly T[];

  readonly page: number;

  readonly pageSize: number;

  readonly totalCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;
}
