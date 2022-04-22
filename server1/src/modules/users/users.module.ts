import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@modules/users/users.service';
import { UsersResolver } from '@modules/users/users.resolver';
import { User, UserSchema } from '@modules/users/models/user.model';
import { UserNotFoundService } from '@shared/errors/userNotFound.service';
import { UsernameAlreadyUsedService } from '@shared/errors/usernameAlreadyUsed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UsersResolver,
    UsersService,
    UserNotFoundService,
    UsernameAlreadyUsedService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
