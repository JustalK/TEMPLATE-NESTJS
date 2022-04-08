import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

import createUserInput from './dto/createUsers.dto';

@Injectable()
export class UsersService {
  async findAll(): Promise<Cat[]> {
    return this.userModel.find().exec();
  }

  async create(createUserInput: createUserInput): Promise<User> {
    const createdUser = new this.User(createUserInput);
    return createdUser.save();
  }
}
