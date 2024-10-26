import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../interfaces/payload";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt-access") {
  constructor(private readonly configService: ConfigService) {
    const jwtConfig = configService.get("jwt");

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessTokenSecret,
    });
  }

  validate(payload: TokenPayload) {
    return payload;
  }
}
