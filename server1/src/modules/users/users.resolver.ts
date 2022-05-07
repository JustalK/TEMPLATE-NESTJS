import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/users.service';
import { CreateUserInput } from '@modules/users/dto/createUser.input';
import MongooseClassSerializerInterceptor from '@shared/mongooseClassSerializer.interceptor';

@Resolver(() => User)
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  userFindById(id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async userFindAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async userCreate(@Args('CreateUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
