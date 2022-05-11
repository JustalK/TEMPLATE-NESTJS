import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/models/user.model';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import { UpdateUserInput } from '@modules/users/dto/updateUser.input';
import { UserNotFoundService } from '@shared/errors/userNotFound.service';
import { SharedService } from '@shared/shared.service';
import { UsersRepository } from '@modules/users/users.repository';

/**
 * Service managing the user
 */
@Injectable()
export class UsersService extends SharedService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  /**
   * The constructor of user
   * @param userRepository The user repository
   * @param userNotFoundService The error when an user is not found
   */
  constructor(
    private readonly userRepository: UsersRepository,
    private userNotFoundService: UserNotFoundService,
  ) {
    super(userRepository);
  }

  /**
   * Check if an user exist in the database
   * @param username The username of the user to check
   * @return True if the user exist or false
   */
  async existByUsername(username: string): Promise<boolean> {
    return this.userRepository.exists({ username });
  }

  /**
   * Return an user based on his username
   * @param username The username of the user to search
   * @return The user found
   * @throws {NotFoundException} When the user is not found
   */
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      this.userNotFoundService.trigger(username);
    }

    return user;
  }
}
