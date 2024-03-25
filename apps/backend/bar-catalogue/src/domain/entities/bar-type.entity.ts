import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bar } from './bar.entity';
import { BarTypeCategory } from './bar-type-category.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('bar_types')
export class BarType {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Bar, (bar) => bar.typeList)
  barList: Bar[];

  @ManyToOne(() => BarTypeCategory, (category) => category.barTypeList, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  category: BarTypeCategory;
}
