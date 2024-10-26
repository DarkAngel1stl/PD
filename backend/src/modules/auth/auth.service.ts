import {
  Injectable,
  ForbiddenException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Tokens } from './interfaces/tokens';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { SessionsService } from './sessions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User & Tokens> {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.usersService.create(createUserDto);

    const tokens = await this.getTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await this.sessionsService.createSession(user.id, tokens.refreshToken);

    return {
      ...user,
      ...tokens,
    };
  }

  async signin(authDto: AuthDto): Promise<User & Tokens> {
    const user = await this.usersService.findByEmail(authDto.email);

    if (!user) {
      throw new ForbiddenException('Incorrect email address');
    }

    if (!(await bcrypt.compare(authDto.password, user.password))) {
      throw new ForbiddenException('Incorrect password');
    }

    const tokens = await this.getTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await this.sessionsService.updateSession(user.id, tokens.refreshToken);

    return {
      ...user,
      ...tokens,
    };
  }

  async logout(id: string): Promise<string> {
    await this.sessionsService.updateSession(id, null);
    return 'Logout successful';
  }

  async refreshTokens(id: string, refreshToken: string): Promise<Tokens> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const session = await this.sessionsService.findSessionByUserId(user.id);

    if (!(refreshToken === session.refreshToken)) {
      throw new UnauthorizedException('Refresh token is not valid');
    }

    const tokens = await this.getTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await this.sessionsService.updateSession(user.id, tokens.refreshToken);

    return tokens;
  }

  async getMe(id: string): Promise<User> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getTokens(payload: Buffer | object): Promise<Tokens> {
    const jwtConfig = this.configService.get('jwt');

    const accessToken = await this.jwtService.sign(payload, {
      secret: jwtConfig.accessTokenSecret,
      expiresIn: jwtConfig.jwtExpAccessToken,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: jwtConfig.refreshTokenSecret,
      expiresIn: jwtConfig.jwtExpRefreshToken,
    });

    return { accessToken, refreshToken };
  }
}
