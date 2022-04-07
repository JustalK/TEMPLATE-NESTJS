import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      firstname: 'FN1',
      lastname: 'LN1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      firstname: 'FN2',
      lastname: 'LN2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
