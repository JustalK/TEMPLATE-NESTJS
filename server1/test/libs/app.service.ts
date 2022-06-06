import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { SeederService } from '@test/libs/seeder.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import request from 'supertest-graphql';
import { DocumentNode } from 'graphql';

/**
 * Primary business layer
 * The service abstract class for managing the same fonction shared by whole service
 */
export class AppService {
  mongoServer: MongoMemoryServer;
  moduleFixture: TestingModule;
  app: INestApplication;
  dbConnection: TestingModule;
  uri: string;

  async init() {
    this.moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
        // For service: https://dev.to/webeleon/unit-testing-nestjs-with-mongo-in-memory-54gd
        MongooseModule.forRootAsync({
          useFactory: async () => {
            this.mongoServer = await MongoMemoryServer.create();
            return { uri: this.mongoServer.getUri() };
          },
        }),
      ],
    }).compile();

    this.app = this.moduleFixture.createNestApplication();
    this.dbConnection = await this.moduleFixture.get(getConnectionToken());

    await this.app.init();
  }

  async start() {
    await this.init();
    const seederService = new SeederService(this.moduleFixture);
    await seederService.seed();
  }

  async query(query: DocumentNode, variables) {
    return request(this.app.getHttpServer()).mutate(query).variables(variables);
  }

  async stop() {
    await this.dbConnection.close();
    await this.mongoServer.stop();
    await this.app.close();
  }
}
