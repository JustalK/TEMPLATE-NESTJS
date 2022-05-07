import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/models/user.model';
import { UserNotFoundService } from '@src/shared/errors/userNotFound.service';
import { NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@modules/users/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private userNotFoundService: UserNotFoundService,
  ) {}

  async existByUsername(username: string): Promise<boolean> {
    return this.userRepository.exists({ username });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      username,
    });
    if (!user) {
      this.userNotFoundService.trigger(username);
    }

    return user;
  }

  async findById(_id: string): Promise<User> {
    const user = await this.userRepository.findById(_id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create({ username, password }): Promise<User> {
    const user = await this.userRepository.create({
      username,
      password,
    });
    return user;
  }
}
