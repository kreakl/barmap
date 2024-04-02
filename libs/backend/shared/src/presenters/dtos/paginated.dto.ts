import { IsArray } from 'class-validator';
import {
  IPaginatedType,
  PaginatedDtoParameters,
} from '@bar-map/shared/presenters/dtos/types';

export class PaginatedDto<T> implements IPaginatedType<T> {
  @IsArray()
  readonly data: readonly T[];

  readonly page: number;

  readonly pageSize: number;

  readonly totalCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor(
    data: T[],
    { paginatedParams, itemCount }: PaginatedDtoParameters,
  ) {
    this.data = data;
    this.page = paginatedParams.page ?? 1;
    this.pageSize = paginatedParams.pageSize ?? 10;
    this.totalCount = itemCount;
    this.pageCount = Math.ceil(this.totalCount / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
