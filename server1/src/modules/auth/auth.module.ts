import { Module } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { UsersModule } from '@modules/users/users.module';
import { AuthResolver } from '@modules/auth/auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '@shared/configs/services/jwt-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
