import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './models/user.model';
import { RepositoryService } from '../shared/repository.service';

@Injectable()
export class UsersService extends RepositoryService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }
}
