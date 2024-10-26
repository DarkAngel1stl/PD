import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_SKIP_AUTH_KEY } from "../../../decorators/skip-auth.decorator";

@Injectable()
export class AccessTokenGuard extends AuthGuard("jwt-access") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext) {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(IS_SKIP_AUTH_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isSkipAuth) {
      return true;
    }

    return super.canActivate(ctx);
  }
}
