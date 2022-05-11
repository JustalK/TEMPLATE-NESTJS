import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/users.service';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import MongooseClassSerializerInterceptor from '@shared/mongooseClassSerializer.interceptor';

/**
 * The resolver of the user
 */
@Resolver(() => User)
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Return the user from the id provided
   * @return The user found
   */
  @Query(() => User)
  userFindById(id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  /**
   * Return all the user
   * @return The users found
   */
  @Query(() => [User])
  async userFindAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Create an user
   * @return The user created
   */
  @Mutation(() => User)
  async userCreate(@Args('CreateUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
