import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Bar } from './bar.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLPhoneNumber } from 'graphql-scalars';

@ObjectType()
@Entity('bar_outlets')
export class BarOutlet {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Address, (address) => address.barOutletList, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  address: Address;

  @Column('text', {
    nullable: true,
  })
  pictureUrl?: string;

  @ManyToOne(() => Bar, (bar) => bar.outletList, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  bar: Bar;

  @Field(() => GraphQLPhoneNumber)
  @Column('varchar', { length: 12, nullable: true })
  phoneNumber?: string;
}
