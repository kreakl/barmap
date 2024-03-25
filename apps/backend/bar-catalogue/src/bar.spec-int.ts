import { AppModule } from '@catalogue/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { initializeWebServer } from '@catalogue/infrastructure/tests/test-utils';
import { App } from 'supertest/types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from '@catalogue/infrastructure/tests/test.service';

describe('GraphQL', () => {
  let app: unknown;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let agent: TestAgent;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let typeOrmModule: TypeOrmModule;
  let testService: TestService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = await initializeWebServer(moduleRef);
    agent = request.agent(app as App);
  });

  beforeEach(async () => {
    await testService.cleanDatabase();
  });

  describe('query bars', async () => {
    it('When queried for all existing bars, should return response with known fields', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const queryData = {
        query: `
          query Bars {
            bars {
              name
              description
              typeList {
                id
                name
              }
              franchise {
                id
                name
              }
              outletList {
                id
                phoneNumber
                address
                pictureUrl
              }
              logoUrl
            }
          }
        `,
      };
    });
  });
});
