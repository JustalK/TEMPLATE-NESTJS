import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
