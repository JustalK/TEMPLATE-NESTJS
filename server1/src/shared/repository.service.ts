import { Model } from 'mongoose';

export class RepositoryService<M, CreateInput> {
  constructor(private readonly model: Model<M>) {}

  create(data: CreateInput): Promise<M> {
    const obj: any = new this.model(data);
    return obj.save();
  }

  async findAll(): Promise<M[]> {
    return this.model.find();
  }
}
