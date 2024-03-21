import { OrmPersistenceModule } from './persistence/orm/orm-persistence.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrmPersistenceModule],
  exports: [OrmPersistenceModule],
})
export class BarInfrastructureModule {}
