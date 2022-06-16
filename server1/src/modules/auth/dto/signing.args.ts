import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SigningArgs {
  @Field(() => String, { description: 'The username of the person to signin' })
  username: string;

  @Field(() => String, { description: 'The password of the person to signin' })
  password: string;
}
