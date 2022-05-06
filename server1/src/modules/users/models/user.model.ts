import * as mongoose from 'mongoose';
import { MinLength, MaxLength } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RepositoryService } from '@src/shared/repository.service';

@Schema()
@ObjectType({ description: 'user' })
export class User {
  @Field(() => String, { description: 'ID of the user' })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Name of the user' })
  username: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Password of the user' })
  @MinLength(6)
  @MaxLength(50)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.path('username').validate(async function (value: string) {
  try {
    const UserServices = new RepositoryService<User, never, never>(
      this.model(User.name),
    );
    const rsl = await UserServices.exists({ username: value });
    return !rsl;
  } catch (err) {
    console.log(err.stack);
  }
}, 'Username already taken by someone else');
