import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RefreshArgs {
  @Field()
  refresh_token: string;
}
