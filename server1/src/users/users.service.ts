import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/createUser.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserInput): Promise<User> {
    const user = new this.userModel(createUserDto);
    console.log(user);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
