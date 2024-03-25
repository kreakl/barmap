import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLCountryCode } from 'graphql-scalars';

@ObjectType()
@Entity('states')
export class State {
  @Field(() => GraphQLCountryCode)
  @PrimaryColumn('varchar', { length: 2 })
  isoAlphaCode2: string;

  @Column('varchar', { length: 100 })
  name: string;
}
