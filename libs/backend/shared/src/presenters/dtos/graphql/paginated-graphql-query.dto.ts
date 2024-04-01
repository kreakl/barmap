import { ArgsType } from '@nestjs/graphql';
import { PaginatedQueryParametersDto } from '../paginated-query-parameters.dto';

@ArgsType()
export class PaginatedGraphQLQueryParameters extends PaginatedQueryParametersDto {
  override get skip() {
    return super.skip;
  }
}
