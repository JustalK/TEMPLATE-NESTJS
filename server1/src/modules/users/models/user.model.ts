import * as mongoose from 'mongoose';
import { MinLength, MaxLength } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType({ description: 'user' })
export class User {
  @Field(() => String, { description: 'ID of the user' })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'Name of the user' })
  @MaxLength(50)
  username: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Password of the user' })
  @MinLength(6)
  @MaxLength(50)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { UsersService } from '@modules/users/users.service';
UserSchema.path('username').validate(async function (value: string) {
  try {
    const UserServices = new UsersService(this.model(User.name), null);
    const rsl = await UserServices.existByUsername(value);
    return !rsl;
  } catch (err) {
    console.log(err.stack);
  }
}, 'Username already taken by someone else');
