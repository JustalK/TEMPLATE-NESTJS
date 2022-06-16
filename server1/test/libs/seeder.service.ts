import { TestingModule } from '@nestjs/testing';
import { UserModel, User } from '@modules/users/models/user.model';
import { UsersRepository } from '@modules/users/users.repository';
import { MockFactory } from 'mockingbird';

/**
 * The seeder of the mongo memory server
 */
export class SeederService {
  usersRepository: UsersRepository;

  /**
   * Set the repositories for populating the database
   */
  constructor(readonly moduleFixture: TestingModule) {
    this.usersRepository = moduleFixture.get<UsersRepository>(UsersRepository);
  }

  /**
   * Seed the database with the information of this function
   */
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
