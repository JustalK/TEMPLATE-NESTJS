import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryService<T> {
  constructor(private model: T) {
    this.model = model;
  }

  /**
  async findOne(username: string): Promise<T | undefined> {
    return this.model.find((user) => user.username === username);
  }
  **/
}
