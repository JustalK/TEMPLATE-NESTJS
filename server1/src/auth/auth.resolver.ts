import { Args, Mutation, Resolver, createUnionType } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import { Payload } from './models/payload.model';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

import { ObjectType, IntersectionType } from '@nestjs/graphql';
@ObjectType()
export class ResultUnion extends IntersectionType(User, Payload) {}

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ResultUnion)
  async login(@Args('LoginInput') loginInput: LoginInput) {
    const { _doc: user } = await this.authService.validateUser('kevin', 'test');
    const payload = await this.authService.createPayload(user);
    return {
      ...user,
      ...payload,
    };
  }
}
