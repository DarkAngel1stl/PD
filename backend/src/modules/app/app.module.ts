import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import appConfig from '../../config/app.config';
import swaggerConfig from '../../config/swagger.config';
import jwtConfig from '../../config/jwt.config';
import s3Config from '../../config/s3.config';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PublicationsModule } from '../publications/publications.module';
import { createUserMiddleware } from '../../providers/prisma/middlewares/create-user.middleware';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, swaggerConfig, jwtConfig, s3Config],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [createUserMiddleware()],
      },
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    UsersModule,
    StoreModule,
    PublicationsModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
