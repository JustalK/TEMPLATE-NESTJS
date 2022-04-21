import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@modules/users/users.service';
import { UsersResolver } from '@modules/users/users.resolver';
import { User, UserSchema } from '@modules/users/models/user.model';
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
