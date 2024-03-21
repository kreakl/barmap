import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('states')
export class StateEntity {
  @PrimaryColumn('varchar', { length: 2 })
  isoAlphaCode2: string;

  @Column('varchar', { length: 100 })
  name: string;
}
