import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AccessToken } from './interfaces/tokens';
import { AuthDto } from './dto/auth.dto';
import { getCurrentUserId } from '../../decorators/user-id.decorator';
import { getCurrentRefreshToken } from '../../decorators/refresh-token.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SkipAuth } from '../../decorators/skip-auth.decorator';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import Serialize from '../../decorators/serialize.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-up')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User & AccessToken> {
    const data = await this.authService.signup(createUserDto);

    const jwtConfig = this.configService.get('jwt');

    res.cookie('token', data.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + jwtConfig.jwtExpRefreshToken * 1000),
    });

    delete data.refreshToken;

    return data;
  }

  @SkipAuth()
  @Serialize(User)
  @Post('sign-in')
  async signin(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User & AccessToken> {
    const data = await this.authService.signin(authDto);

    const jwtConfig = this.configService.get('jwt');

    res.cookie('token', data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + jwtConfig.jwtExpRefreshToken * 1000),
    });

    delete data.refreshToken;

    return data;
  }

  @ApiBearerAuth()
  @Serialize(User)
  @Get('get-me')
  getMe(@getCurrentUserId() id: string): Promise<User> {
    return this.authService.getMe(id);
  }

  @ApiBearerAuth()
  @Get('logout')
  async logout(
    @getCurrentUserId() id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now()),
    });

    return this.authService.logout(id);
  }

  @SkipAuth()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh-tokens')
  async refreshToken(
    @getCurrentRefreshToken('token') refreshToken: string,
    @getCurrentUserId() id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const tokens = await this.authService.refreshTokens(id, refreshToken);

    const jwtConfig = this.configService.get('jwt');

    res.cookie('token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + jwtConfig.jwtExpRefreshToken * 1000),
    });

    return { accessToken: tokens.accessToken };
  }
}
