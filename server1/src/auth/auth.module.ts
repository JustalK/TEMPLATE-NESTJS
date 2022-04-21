import { Module } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { LocalStrategy } from '@src/auth/strategies/local.strategy';
import { JwtStrategy } from '@src/auth/strategies/jwt.strategy';
import { UsersModule } from '@src/users/users.module';
import { AuthResolver } from '@src/auth/auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@src/auth/auth.constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
