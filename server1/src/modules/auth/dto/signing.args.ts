import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SigningArgs {
  @Field()
  username: string;

  @Field()
  password: string;
}
