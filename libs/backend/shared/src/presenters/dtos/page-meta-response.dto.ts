import { PageMetaDtoParameters } from './types';

export class PageMetaResponseDto {
  readonly page: number;

  readonly pageSize: number;

  readonly itemCount: number;

  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({ paginatedQueryDto, itemCount }: PageMetaDtoParameters) {
    this.page = paginatedQueryDto.page ?? 1;
    this.pageSize = paginatedQueryDto.pageSize ?? 10;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
