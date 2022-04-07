import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from './models/user.model';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User)
  async recipe(@Args('id') id: string): Promise<User> {
    const recipe = await this.usersService.findOne(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }
}
