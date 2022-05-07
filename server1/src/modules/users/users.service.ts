import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/models/user.model';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import { UpdateUserInput } from '@modules/users/dto/updateUser.input';
import { UserNotFoundService } from '@shared/errors/userNotFound.service';
import { SharedService } from '@shared/shared.service';
import { UsersRepository } from '@modules/users/users.repository';

@Injectable()
export class UsersService extends SharedService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(
    private readonly userRepository: UsersRepository,
    private userNotFoundService: UserNotFoundService,
  ) {
    super(userRepository);
  }

  async existByUsername(username: string): Promise<boolean> {
    return this.userRepository.exists({ username });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      this.userNotFoundService.trigger(username);
    }

    return user;
  }
}
