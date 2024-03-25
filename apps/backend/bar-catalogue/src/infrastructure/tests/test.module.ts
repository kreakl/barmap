import { Module } from '@nestjs/common';
import { TestService } from '@catalogue/infrastructure/tests/test.service';

@Module({
  providers: [TestService],
})
export class TestModule {}
