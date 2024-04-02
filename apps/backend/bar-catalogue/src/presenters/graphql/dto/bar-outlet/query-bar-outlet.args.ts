import { PaginatedQueryParams } from '@catalogue/presenters/graphql/dto';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class BarOutletQueryArgs extends PaginatedQueryParams {
  @IsOptional()
  @IsNumber({}, { each: true })
  @IsArray()
  typeIds?: number[];
}
