import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJwtConfig(
  configServise: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configServise.getOrThrow<string>('JWT_SECRET'),
    signOptions: { algorithm: 'HS256' }, // алгоритм для генерации токенов
    verifyOptions: { algorithms: ['HS256'], ignoreExpiration: false }, // алгоритм для проверки(верификации, раскодировании) токена из куки
  };
}
