import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class Payload {
  @Field(() => String, { description: 'The access token of the user' })
  access_token: string;
  @Field(() => String, { description: 'The refresh token of the app' })
  refresh_token: string;
}
