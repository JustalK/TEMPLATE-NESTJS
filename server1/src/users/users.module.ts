import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';

@Module({
  providers: [TypeOrmModule.forFeature([User]), UsersResolver, UsersService],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
