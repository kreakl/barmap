import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BarEntity } from './bar.entity';

@Entity('franchises')
export class FranchiseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => BarEntity, (bar) => bar.franchise)
  barList: BarEntity[];
}
