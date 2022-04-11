import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType({ description: 'user' })
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User firstName ' })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
