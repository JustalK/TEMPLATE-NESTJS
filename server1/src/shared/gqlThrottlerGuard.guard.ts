import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Throttler guard used in coordination with graphql
 * */
@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  /**
   * Get the response from the guard and create a new context for using graphq
   * @param context The context of the request
   * @return The request split into response and request from graphql context
   * */
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.req.res };
  }
}
