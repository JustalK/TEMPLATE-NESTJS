import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import { UpdateUserInput } from '@modules/users/dto/updateUser.input';
import { User } from '@modules/users/models/user.model';
import { RepositoryService } from '@src/shared/repository.service';
import { UserNotFoundService } from '@src/shared/errors/userNotFound.service';
import { UsernameAlreadyUsedService } from '@shared/errors/usernameAlreadyUsed.service';

@Injectable()
export class UsersService extends RepositoryService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private userNotFoundService: UserNotFoundService,
    private usernameAlreadyUsedService: UsernameAlreadyUsedService,
  ) {
    super(userModel);
  }

  async findByUsername(username: string, exception = true): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user && exception) {
      this.userNotFoundService.trigger(username);
    }

    return user;
  }

  async create(data: CreateUserInput): Promise<User> {
    const tmpUser = await this.findByUsername(data.username, false);
    if (tmpUser) {
      this.usernameAlreadyUsedService.trigger(data.username);
    }

    const obj: any = new this.userModel(data);
    return obj.save();
  }
}
