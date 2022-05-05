import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    this.logger.log(`Errors 2`, {
      __filename,
      name: this.login.name,
    });

    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async createPayload(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signing(username: string, password: string): Promise<any> {
    const user = await this.usersService.create({
      username,
      password,
    });
    return user;
  }
}
