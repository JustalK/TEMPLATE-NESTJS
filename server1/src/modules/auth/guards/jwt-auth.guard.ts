import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthService } from '@modules/auth/auth.service';
import { IS_PUBLIC_KEY } from '@shared/constants/string';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    private reflector: Reflector,
  ) {
    super();
  }

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
