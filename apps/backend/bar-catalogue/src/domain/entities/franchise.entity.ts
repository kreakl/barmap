import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bar } from './bar.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('franchises')
export class Franchise {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Bar, (bar) => bar.franchise)
  barList: Bar[];
}
