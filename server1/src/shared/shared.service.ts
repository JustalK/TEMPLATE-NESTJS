import { RepositoryService } from '@src/shared/repository.service';
import { NotFoundException } from '@nestjs/common';

export class SharedService<M, CreateInput, UpdateInput> {
  constructor(
    private readonly repository: RepositoryService<M, CreateInput, UpdateInput>,
  ) {}

  async findById(_id: string): Promise<M> {
    const doc = await this.repository.findById(_id);
    if (!doc) {
      throw new NotFoundException();
    }
    return doc;
  }

  async findAll(): Promise<M[]> {
    return this.repository.findAll();
  }

  async create(data: CreateInput): Promise<M> {
    return this.repository.create(data);
  }
}
