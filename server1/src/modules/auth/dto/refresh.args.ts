import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class RefreshArgs {
  @Field(() => String, {
    description: 'The token for refreshing the Oauth token',
  })
  refresh_token: string;
}
