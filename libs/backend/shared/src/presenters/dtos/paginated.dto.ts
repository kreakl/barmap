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

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor(
    data: T[],
    { paginatedQueryDto, itemCount }: PaginatedDtoParameters,
  ) {
    this.data = data;
    this.page = paginatedQueryDto.page ?? 1;
    this.pageSize = paginatedQueryDto.pageSize ?? 10;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
