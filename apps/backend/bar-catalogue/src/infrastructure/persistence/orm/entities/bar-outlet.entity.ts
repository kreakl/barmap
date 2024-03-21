import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { BarEntity } from './bar.entity';

@Entity('bar_outlets')
export class BarOutletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AddressEntity, (address) => address.barOutletList, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  address: AddressEntity;

  @Column('text', {
    nullable: true,
  })
  pictureUrl: string;

  @ManyToOne(() => BarEntity, (bar) => bar.outletList, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  bar: BarEntity;

  @Column('varchar', { length: 12, nullable: true })
  phoneNumber: string;
}
