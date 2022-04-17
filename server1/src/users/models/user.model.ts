import { Field, ObjectType } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType({ description: 'user' })
export class User {
  @Field(() => String, { description: 'ID of the user' })
  _id: MongooseSchema.Types.ObjectId;

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
