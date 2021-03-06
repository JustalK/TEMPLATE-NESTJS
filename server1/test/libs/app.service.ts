import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { SeederService } from '@test/libs/seeder.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import request from 'supertest-graphql';
import requestHTTP from 'supertest';
import { DocumentNode } from 'graphql';

/**
 * The App testing service
 * Define how to start, stop and manage the testing server
 */
export class AppService {
  mongoServer: MongoMemoryServer;
  moduleFixture: TestingModule;
  app: INestApplication;
  dbConnection: TestingModule;
  uri: string;

  /**
   * Start the testing server and seed it
   */
  async start() {
    await this.init();
    const seederService = new SeederService(this.moduleFixture);
    await seederService.seed();
  }

  /**
   * Initialize the testing server with the right informaton
   */
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

  /**
   * Execute request against the testing server
   * @param query The query gql to execute
   * @param variables The variables to pass to the query
   * @return The result of the call
   */
  async query(query: DocumentNode, variables) {
    return request(this.app.getHttpServer()).mutate(query).variables(variables);
  }

  /**
   * Execute request against the testing server
   * @param query The query gql to execute
   * @param variables The variables to pass to the query
   * @return The result of the call
   */
  async queryHTTP(path = '') {
    return requestHTTP(this.app.getHttpServer()).get(path);
  }

  /**
   * Stop the testing server and remove all active connection
   */
  async stop() {
    await this.dbConnection.close();
    await this.mongoServer.stop();
    await this.app.close();
  }
}
