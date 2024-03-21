import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BarEntity } from './bar.entity';
import { BarTypeCategoryEntity } from './bar-type-category.entity';

@Entity('bar_types')
export class BarTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => BarEntity, (bar) => bar.typeList)
  barList: BarEntity[];

  @ManyToOne(() => BarTypeCategoryEntity, (category) => category.barTypeList, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  category: BarTypeCategoryEntity;
}
