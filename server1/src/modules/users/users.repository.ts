import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import { UpdateUserInput } from '@modules/users/dto/updateUser.input';
import { User } from '@modules/users/models/user.model';
import { RepositoryService } from '@src/shared/repository.service';

/**
 * The user repository
 */
@Injectable()
export class UsersRepository extends RepositoryService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  /**
   * The constructor of the repository
   * @param userModel The model
   */
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  /**
   * Return an user based on his username
   * @param username The username of the user to search
   * @return The user found
   * @throws {NotFoundException} When the user is not found
   */
  async findByUsername(username: string): Promise<User> {
    return this.findOne<{ username: string }>({ username });
  }
}
