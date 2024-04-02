import { PaginatedQueryParams } from '@catalogue/presenters/graphql/dto';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class BarQueryArgs extends PaginatedQueryParams {
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  typeIds?: number[];
}
