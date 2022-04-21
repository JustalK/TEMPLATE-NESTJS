import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@src/users/users.service';
import { UsersResolver } from '@src/users/users.resolver';
import { User, UserSchema } from '@src/users/models/user.model';
import { UserNotFoundService } from '@src/shared/errors/userNotFound.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersResolver, UsersService, UserNotFoundService],
  exports: [UsersService],
})
export class UsersModule {}
