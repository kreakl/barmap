import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BarTypeEntity } from './bar-type.entity';

@Entity('bar_type_categories')
export class BarTypeCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => BarTypeEntity, (type) => type.category)
  barTypeList: BarTypeEntity[];
}
