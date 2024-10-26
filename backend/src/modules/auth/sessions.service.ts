import { PrismaService } from '../../providers/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findSessionByUserId(userId: string) {
    return await this.prisma.session.findUnique({
      where: {
        userId,
      },
    });
  }

  async createSession(userId: string, refreshToken: string) {
    return await this.prisma.session.create({
      data: {
        userId,
        refreshToken,
      },
    });
  }

  async updateSession(userId: string, refreshToken: string | null) {
    return await this.prisma.session.update({
      data: {
        refreshToken,
      },
      where: {
        userId,
      },
    });
  }
}
