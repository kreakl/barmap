import { TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

let app: INestApplication;

export const initializeWebServer = async (moduleRef: TestingModule) => {
  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return app.getHttpServer();
};

export const stopWebServer = async () => {
  return await app.close();
};
