import { Repository } from '@bar-map/shared';
import { BarEntity } from '../../infrastructure/persistence/orm/entities/bar.entity';

export abstract class BarRepository extends Repository<BarEntity, number> {}
