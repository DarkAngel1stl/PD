import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const getCurrentRefreshToken = createParamDecorator(
  (data: string, ctx: ExecutionContext): number => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (!data) {
      return request.cookies;
    }

    return request.cookies?.[data];
  }
);
