import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
  @Field(() => String, { description: 'Username of the user to login' })
  username: string;

  @Field(() => String, { description: 'Password of the user to login' })
  password: string;
}
