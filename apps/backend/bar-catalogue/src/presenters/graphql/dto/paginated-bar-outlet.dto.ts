import { PaginatedGraphqlResponseDto } from '@bar-map/shared';
import { BarOutlet } from '@catalogue/domain/entities';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedBarOutletDto extends PaginatedGraphqlResponseDto(
  BarOutlet,
) {}
