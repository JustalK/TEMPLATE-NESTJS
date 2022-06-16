import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * This file managing the jwt strategy
 * */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Build the jwt strategy
   * @param configService The Config Service for getting the jwt config
   * */
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.bearerToken.secret'),
    });
  }

  /**
   * Validate a user based on an username and password
   * @param username the username of the user
   * @param password the password of the user
   * @return The information from the payload
   * */
  async validate(payload: { sub: string; username: string }) {
    return { userId: payload.sub, username: payload.username };
  }
}
