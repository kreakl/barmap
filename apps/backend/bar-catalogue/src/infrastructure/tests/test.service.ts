import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TestService {
  constructor(@InjectDataSource() public dataSource: DataSource) {}

  public async cleanDatabase(): Promise<void> {
    try {
      const entities = this.dataSource.entityMetadatas;
      const tableNames = entities
        .map((entity) => `"${entity.tableName}"`)
        .join(', ');

      await this.dataSource.query(`TRUNCATE ${tableNames} CASCADE;`);
    } catch (error) {
      throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
  }
}
