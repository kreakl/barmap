import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BarType } from './bar-type.entity';
import { Franchise } from './franchise.entity';
import { BarOutlet } from './bar-outlet.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLPositiveFloat } from 'graphql-scalars';

@ObjectType()
@Entity('bars')
export class Bar {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => BarType, (type) => type.bars)
  @JoinTable()
  types: BarType[];

  @ManyToOne(() => Franchise, (franchise) => franchise.bars, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  franchise: Franchise;

  @OneToMany(() => BarOutlet, (outlet) => outlet.bar)
  outlets: BarOutlet[];

  @Column('text', {
    nullable: true,
  })
  logoUrl?: string;

  @Field(() => GraphQLPositiveFloat)
  @Column('integer', {
    nullable: true,
  })
  averageBillSum?: number;
}
