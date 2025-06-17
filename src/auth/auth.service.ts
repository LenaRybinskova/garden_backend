import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from 'src/auth/dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Response } from 'express';
import { isDev } from 'src/utils/isDev.util';


@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

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
    this.COOKIE_DOMAIN = this.configService.getOrThrow(
      'COOKIE_DOMAIN',
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

  // устанавливает рефреш токен в куку c response
  private setCookie(res: Response, refreshToken: string, expires: Date) {
    res.cookie('token', refreshToken, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService), //флаг если isDev=true то кука цепл и на http и на https, false только на https
      sameSite: isDev(this.configService) ? 'none' : 'lax', //если isDev=true то с любого домена на запрос будет веш кука
    });
  }

  // оформляет респонст ( рефр в куку, аксесс в пейлод)
  private async  auth(res: Response, id: string) {
    const { refreshToken, accessToken } = await this.generateTokens(id);
    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    )
    return { accessToken }
  }


  async registration(res: Response, dto: RegisterDto) {
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

    return this.auth(res,user.id );
  }


  async login(res: Response, dto: LoginDto) {
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

    return this.auth(res,existUser.id );
  }
}
