import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginatedDto } from '../paginated.dto';
import { IPaginatedType } from '@bar-map/shared';

export function PaginatedGraphqlResponseDto<T>(
  classRef: Type<T>,
): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef])
    readonly data: T[];

    @Field()
    readonly hasNextPage: boolean;

    @Field()
    readonly hasPreviousPage: boolean;

    @Field(() => Int)
    readonly totalCount: number;

    @Field(() => Int)
    readonly page: number;

    @Field(() => Int)
    readonly pageCount: number;

    @Field(() => Int)
    readonly pageSize: number;

    protected constructor(paginated: PaginatedDto<T>) {
      Object.assign(this, paginated);
    }
  }

  return PaginatedType as unknown as Type<IPaginatedType<T>>;
}
