import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BarOutlet } from '@catalogue/domain/entities/bar-outlet.entity';

@ObjectType()
@Entity('photos')
export class Photo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => BarOutlet, (outlet) => outlet.photos)
  @JoinColumn()
  outlet: BarOutlet;
}
