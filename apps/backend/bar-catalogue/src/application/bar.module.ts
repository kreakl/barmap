import { Module } from '@nestjs/common';
import { BarInfrastructureModule } from '../infrastructure/bar-infrastructure.module';

@Module({
  imports: [BarInfrastructureModule],
})
export class BarModule {}
