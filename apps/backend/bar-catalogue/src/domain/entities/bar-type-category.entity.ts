import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BarType } from './bar-type.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('bar_type_categories')
export class BarTypeCategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Field({ name: 'types' })
  @OneToMany(() => BarType, (type) => type.category)
  barTypes: BarType[];
}
