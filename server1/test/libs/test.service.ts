import { ServerService } from '@test/libs/server.service';
import { UserModel, User } from '@modules/users/models/user.model';
import { UsersRepository } from '@modules/users/users.repository';
import { MockFactory } from 'mockingbird';

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
    const oneBird = MockFactory<User>(User).one();
    const t = await this.usersRepository.create(oneBird);
    console.log(t);
  }

  async stop() {
    await this.serverService.stop();
  }
}
