import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { Experience0Service } from './experience0.service';
import { Data } from './schema/data.schema';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthService } from '../../auth/auth.service';

@Controller('experience0')
export class Experience0Controller {
  constructor(
    private readonly appService: Experience0Service,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): Promise<Data[]> {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
