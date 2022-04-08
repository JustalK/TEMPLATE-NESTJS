import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from './models/user.model';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUser.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User)
  async userFindOne(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation((returns) => User)
  async upvotePost(@Args('CreateUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
