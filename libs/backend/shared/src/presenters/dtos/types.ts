import { PaginatedQueryParametersDto } from './paginated-query-parameters.dto';

export interface PaginatedDtoParameters {
  paginatedQueryDto: PaginatedQueryParametersDto;
  itemCount: number;
}

export interface IPaginatedType<T> {
  readonly data: readonly T[];

  readonly page: number;

  readonly pageSize: number;

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;
}
