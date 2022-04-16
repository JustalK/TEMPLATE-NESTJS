import { Model } from 'mongoose';

export class RepositoryService<M, CreateInput, UpdateInput> {
  constructor(private readonly model: Model<M>) {}

  async create(data: CreateInput): Promise<M> {
    const obj: any = new this.model(data);
    return obj.save();
  }

  async update(_id: string, data: UpdateInput): Promise<M> {
    return this.model.findByIdAndUpdate(_id, data, { new: true });
  }

  async findAll(): Promise<M[]> {
    return this.model.find();
  }

  async removeAll(): Promise<M[]> {
    return this.model.remove();
  }

  async findById(_id: string): Promise<M> {
    return this.model.findById(_id);
  }

  async removeById(_id: string): Promise<M> {
    return this.model.findByIdAndDelete(_id);
  }
}
