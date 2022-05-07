import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import { UpdateUserInput } from '@modules/users/dto/updateUser.input';
import { User } from '@modules/users/models/user.model';
import { RepositoryService } from '@src/shared/repository.service';

@Injectable()
export class UsersRepository extends RepositoryService<
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
    return this.findOne<{ username: string }>({ username });
  }
}
