import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/auth/config/jwt.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule, PrismaModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
