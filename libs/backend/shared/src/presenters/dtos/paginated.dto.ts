import { IsArray } from 'class-validator';
import { PageMetaResponseDto } from './page-meta-response.dto';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaResponseDto;

  constructor(data: T[], meta: PageMetaResponseDto) {
    this.data = data;
    this.meta = meta;
  }
}
