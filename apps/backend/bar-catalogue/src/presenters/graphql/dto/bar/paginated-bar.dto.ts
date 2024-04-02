import { PaginatedGraphqlResponseDto } from '@bar-map/shared';
import { Bar } from '@catalogue/domain/entities';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedBarDto extends PaginatedGraphqlResponseDto(Bar) {}
