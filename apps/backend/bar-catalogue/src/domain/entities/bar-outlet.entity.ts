import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Bar } from './bar.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLPhoneNumber } from 'graphql-scalars';
import { Photo } from '@catalogue/domain/entities/photo.entity';

@ObjectType()
@Entity('bar_outlets')
export class BarOutlet {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Address, (address) => address.barOutlets, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  address: Address;

  @Field(() => [Photo], { nullable: 'itemsAndList' })
  @OneToMany(() => Photo, (photo) => photo.outlet)
  photos?: Photo[];

  @ManyToOne(() => Bar, (bar) => bar.outlets, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  bar: Bar;

  @Field(() => GraphQLPhoneNumber)
  @Column('varchar', { length: 12 })
  phoneNumber: string;

  @Column('text', {})
  description: string;
}
