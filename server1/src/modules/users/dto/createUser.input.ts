import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'The inputs for creating a new user' })
export class CreateUserInput {
  @Field(() => String, { description: 'The username of the new user' })
  username: string;

  @Field(() => String, { description: 'The password of the new user' })
  password: string;
}
