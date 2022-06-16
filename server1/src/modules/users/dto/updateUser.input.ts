import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'The inputs for updating a user' })
export class UpdateUserInput {
  @Field(() => String, { description: 'The new name of the user' })
  name: string;
}
