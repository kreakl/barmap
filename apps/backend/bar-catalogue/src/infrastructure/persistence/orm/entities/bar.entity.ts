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
import { BarTypeEntity } from './bar-type.entity';
import { FranchiseEntity } from './franchise.entity';
import { BarOutletEntity } from './bar-outlet.entity';

@Entity('bars')
export class BarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => BarTypeEntity, (type) => type.barList)
  @JoinTable()
  typeList: BarTypeEntity[];

  @ManyToOne(() => FranchiseEntity, (franchise) => franchise.barList, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  franchise: FranchiseEntity;

  @OneToMany(() => BarOutletEntity, (outlet) => outlet.bar)
  outletList: BarOutletEntity[];

  @Column('text', {
    nullable: true,
  })
  logoUrl: string;
}
