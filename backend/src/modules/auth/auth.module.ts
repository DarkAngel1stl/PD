import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { UsersModule } from "../users/users.module";
import { SessionsService } from "./sessions.service";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, SessionsService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
