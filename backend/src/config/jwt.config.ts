import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
  secret: process.env.JWT_SECRET || "secret",
  accessTokenSecret: process.env.ACCESS_TOKEN || "accessTokenSecret",
  refreshTokenSecret: process.env.REFRESH_TOKEN || "refreshTokenSecret",
  jwtExpAccessToken: process.env.ACCESS_TOKEN_EXP || 60 * 30, // 30m
  jwtExpRefreshToken: process.env.REFRESH_TOKEN_EXP || 60 * 60 * 24 * 10, // 10d
}));
