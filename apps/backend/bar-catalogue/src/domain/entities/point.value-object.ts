import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Point {
  type: 'Point';
  @Field(() => [Float])
  coordinates: number[];
}
