import { Field, ObjectType, IntersectionType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class Payload {
  @Field(() => String, { description: 'The access token of the user' })
  access_token: string;
}
