import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

/**
 * This file manage the local strategy
 * */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Build the local strategy
   * @param authService The Auth Service for managing the login
   * */
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Validate a user based on an username and password
   * @param username the username of the user
   * @param password the password of the user
   * @return {User} The user found locally
   * @throws {UnauthorizedException} Unauthorized exception if the user is not found
   * */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
