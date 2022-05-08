import { Injectable, Inject, LoggerService } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async comparePassword(enteredPassword: string, foundPassword: string) {
    return bcrypt.compare(enteredPassword, foundPassword);
  }

  async login(username: string, pass: string): Promise<any> {
    this.logger.log(`Errors 2`, {
      __filename,
      name: this.login.name,
    });

    const user = await this.usersService.findByUsername(username);
    if (user && (await this.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async createPayload(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const refreshPayload = {
      refreshToken: true,
      username: user.username,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(refreshPayload, {
        expiresIn: this.configService.get<string>(
          'auth.refreshToken.expiresIn',
        ),
      }),
    };
  }

  decode(token: string): any {
    return this.jwtService.verify(token);
  }

  async refresh(token: string): Promise<any> {
    const { refreshToken, username } = this.decode(token);
    if (refreshToken) {
      const user = await this.usersService.findByUsername(username);
      return this.createPayload(user);
    }
    return null;
  }

  async signing(username: string, password: string): Promise<any> {
    const user = await this.usersService.create({
      username,
      password,
    });
    return user;
  }
}
