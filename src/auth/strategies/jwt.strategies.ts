import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt.interfaces';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


// эта стратегия проверяет, что в заголовке есть валидный аксесс токен, через @UseGuards(AuthGuard('jwt'))
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // запрет принимать просроч токены
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      algorithms: ['HS256'],
    });
  }

  // validate сраб автом если с токеном все ок
  async validate(payload: JwtPayload) {
    return await this.authService.validateUser(payload.id);
  }
}
