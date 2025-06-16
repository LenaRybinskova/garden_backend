import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from 'src/auth/dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { LoginDto } from 'src/auth/dto/login.dto';


@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = this.configService.getOrThrow('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  //генеровать токена на основе ID юзера
  async generateTokens(id: string) {
    const payload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return { accessToken, refreshToken };
  }

  async registration(dto: RegisterDto) {
    const { login, email, password } = dto;

    const existUser = await this.prismaService.users.findUnique({
      where: { email: email },
    });

    if (existUser) {
      throw new ConflictException('Email already exists'); //409
    }

    const user = await this.prismaService.users.create({
      data: { login, email, password: await hash(password) },
    });

    return this.generateTokens(user.id);
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const existUser = await this.prismaService.users.findUnique({
      where: { email: email },
    });

    if (!existUser) {
      throw new NotFoundException('User not exists'); //404
    }

    const isValidPassword = await verify(existUser.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('User not exists'); //404
    }

    return this.generateTokens(existUser.id);
  }

  async refreshToken(){

  }
}
