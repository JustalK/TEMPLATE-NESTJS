import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@modules/users/models/user.model';
import { Payload } from '@modules/auth/models/payload.model';
import { AuthService } from '@modules/auth/auth.service';
import { LoginArgs } from '@modules/auth/dto/login.args';
import { SigningArgs } from '@modules/auth/dto/signing.args';

import { ObjectType, IntersectionType } from '@nestjs/graphql';
@ObjectType()
export class ResultUnion extends IntersectionType(User, Payload) {}

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => ResultUnion, {
    name: 'login',
    description: 'Allow an user to connect to the app',
  })
  async login(@Args() loginArgs: LoginArgs) {
    const { _doc: user } = await this.authService.validateUser(
      loginArgs.username,
      loginArgs.password,
    );
    const payload = await this.authService.createPayload(user);
    return {
      ...user,
      ...payload,
    };
  }

  @Mutation(() => ResultUnion, {
    name: 'signing',
    description: 'Allow a visitor to register to the app',
  })
  async signing(@Args() signingArgs: SigningArgs) {
    const { _doc: user } = await this.authService.signing(
      signingArgs.username,
      signingArgs.password,
    );
    const payload = await this.authService.createPayload(user);
    return {
      ...user,
      ...payload,
    };
  }
}
