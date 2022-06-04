import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { MinLength, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  MODEL_LIMIT_STRING,
  MODEL_LIMIT_PASSWORD,
  BCRYPT_SALT,
} from '@shared/constants/number';

@Schema()
@ObjectType({ description: 'user' })
export class User {
  @Field(() => String, { description: 'ID of the user' })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'Name of the user' })
  @MaxLength(MODEL_LIMIT_STRING)
  username: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Password of the user', nullable: true })
  @MinLength(MODEL_LIMIT_PASSWORD)
  @MaxLength(MODEL_LIMIT_STRING)
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = mongoose.model<User>(User.name, UserSchema);

import { UsersService } from '@modules/users/users.service';
UserSchema.pre<any>('save', function (next) {
  const { password } = this;
  this.password = bcrypt.hashSync(password, BCRYPT_SALT);
  next();
});

UserSchema.path('username').validate(async function (value: string) {
  try {
    const UserServices = new UsersService(this.model(User.name), null);
    const rsl = await UserServices.existByUsername(value);
    return !rsl;
  } catch (err) {
    console.log(err.stack);
  }
}, 'Username already taken by someone else');
