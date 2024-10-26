import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { TokenPayload } from "../modules/auth/interfaces/payload";

export const getCurrentUserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as TokenPayload;
    return user.id;
  }
);
