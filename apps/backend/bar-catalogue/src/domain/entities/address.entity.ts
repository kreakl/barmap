import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BarOutlet } from './bar-outlet.entity';
import { State } from './state.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Point as GraphQLPoint } from './point.value-object';

@ObjectType()
@Entity('addresses')
export class Address {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  street: string;

  @Field(() => GraphQLPoint)
  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Column('varchar', { length: 100 })
  city: string;

  @ManyToOne(() => State, {
    nullable: false,
  })
  @JoinColumn()
  state: State;

  @OneToMany(() => BarOutlet, (bar) => bar.address)
  barOutletList: BarOutlet[];
}
