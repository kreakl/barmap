import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BarOutletEntity } from './bar-outlet.entity';
import { StateEntity } from './state.entity';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  street: string;

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Column('varchar', { length: 100 })
  city: string;

  @ManyToOne(() => StateEntity, {
    nullable: false,
  })
  @JoinColumn()
  state: StateEntity;

  @OneToMany(() => BarOutletEntity, (bar) => bar.address)
  barOutletList: BarOutletEntity[];
}
