import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/users.service';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import MongooseClassSerializerInterceptor from '@shared/mongooseClassSerializer.interceptor';

@Resolver(() => User)
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  userFindById(id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Query(() => [User])
  async userFindAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async userCreate(@Args('CreateUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
