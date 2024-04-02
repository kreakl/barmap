import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(Order, {
  name: 'Order',
});

// TODO: Make class not tied to concrete representation(REST, GRAPHQL)
@ArgsType()
export class PaginatedQueryParametersDto {
  @Field(() => Order, { defaultValue: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Field(() => Int, { defaultValue: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Field(() => Int, { defaultValue: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly pageSize?: number = 10;

  get skip(): number {
    return ((this.page ?? 1) - 1) * (this.pageSize ?? 10);
  }

  constructor(params: Partial<Omit<PaginatedQueryParametersDto, 'skip'>> = {}) {
    const { order = Order.ASC, page = 1, pageSize = 10 } = params;
    this.order = order;
    this.page = page;
    this.pageSize = pageSize;
  }
}
