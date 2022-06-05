import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, User } from '@modules/users/models/user.model';
import { ServerService } from '@test/libs/server.service';
import { UsersRepository } from '@modules/users/users.repository';
import { MockFactory } from 'mockingbird';
import request from 'supertest-graphql';
import gql from 'graphql-tag';

/**
 * Primary business layer
 * The service abstract class for managing the same fonction shared by whole service
 */
export class AppService {
  mongoServer: MongoMemoryServer;
  moduleFixture: TestingModule;
  app;
  dbConnection;
  uri: string;
  usersRepository: UsersRepository;

  async start() {
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

    this.usersRepository =
      this.moduleFixture.get<UsersRepository>(UsersRepository);

    await this.app.init();
  }

  async seed() {
    // Create one random user based on the schema
    const oneUser = MockFactory<User>(User).one();
    await this.usersRepository.create(oneUser);
    // Create one decided user from scratch
    await this.usersRepository.create(
      new UserModel({
        username: 'justalk',
        password: 'ezc186by',
      }),
    );
  }

  async query(query: { query: string }, bearer = null) {
    return request(this.app.getHttpServer()).mutate(gql`
      mutation {
        login(username: "justalk", password: "ezc186by") {
          username
          access_token
        }
      }
    `);
  }

  async stop() {
    await this.dbConnection.close();
    await this.mongoServer.stop();
    await this.app.close();
  }
}
