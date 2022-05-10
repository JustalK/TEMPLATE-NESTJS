import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

/**
 * Injectable service for managing the token jwt
 */
@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Create the default options for encoding data
   * @return The option for the jwt
   * */
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.configService.get<string>('auth.bearerToken.secret'),
      signOptions: {
        expiresIn: this.configService.get<string>('auth.bearerToken.expiresIn'),
      },
    };
  }
}
