import { ServerService } from '@test/libs/server.service';
import { UserModel, User } from '@modules/users/models/user.model';
import { UsersRepository } from '@modules/users/users.repository';
import { MockFactory } from 'mockingbird';
import 'isomorphic-fetch';

/**
 * Primary business layer
 * The service abstract class for managing the same fonction shared by whole service
 */
export class TestService {
  serverService: ServerService;
  usersRepository: UsersRepository;

  constructor() {
    this.serverService = new ServerService();
    this.usersRepository = new UsersRepository(UserModel);
  }

  async init() {
    await this.serverService.start();
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

  async stop() {
    await this.serverService.stop();
  }

  async query(query: { query: string }, bearer = null) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    };

    const response = await fetch('http://api.server1.net/graphql', options);
    const response_json = await response.json();
    return response_json.errors !== undefined
      ? response_json
      : response_json.data;
  }
}
