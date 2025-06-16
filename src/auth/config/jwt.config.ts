import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJwtConfig(
  configServise: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configServise.getOrThrow<string>('JWT_SECRET'),
    signOptions: { algorithm: 'HS256' },
  };
}
