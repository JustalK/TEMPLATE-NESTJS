import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthService } from '@modules/auth/auth.service';
import { IS_PUBLIC_KEY } from '@shared/constants/string';

/**
 * This file manage the authorization and check the JWT passed in the header
 * */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Build the guard managing the JWT and authentication
   * @param authService The Auth Service for managing the token
   * @param reflector The reflector for getting the header of the request
   * */
  constructor(
    @Inject(AuthService) private authService: AuthService,
    private reflector: Reflector,
  ) {
    super();
  }

  /**
   * Check the authorization for a particular endpoint
   * @return True if the call is public, false if not authorized, The information of the user if the token is valid
   * */
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    // Check if the call is public
    const isPublic = this.reflector.get<string[]>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    // Check if the caller has a token
    const { req } = ctx.getContext();
    const bearer = req.rawHeaders.find((r: string) => r.startsWith('Bearer'));
    if (!bearer) {
      return false;
    }

    // Check if the caller is using an access token and not a refresh token
    const dec = this.authService.decode(bearer.split(' ')[1]);
    if (dec.refreshToken) {
      return false;
    }

    return super.canActivate(new ExecutionContextHost([req]));
  }
}
