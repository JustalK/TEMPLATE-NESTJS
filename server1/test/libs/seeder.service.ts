import { TestingModule } from '@nestjs/testing';
import { UserModel, User } from '@modules/users/models/user.model';
import { UsersRepository } from '@modules/users/users.repository';
import { MockFactory } from 'mockingbird';

/**
 * Primary business layer
 * The service abstract class for managing the same fonction shared by whole service
 */
export class SeederService {
  usersRepository: UsersRepository;
  constructor(private readonly moduleFixture: TestingModule) {
    this.usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
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
}
