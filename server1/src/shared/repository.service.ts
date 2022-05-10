import { Model } from 'mongoose';

/**
 * Data access layer
 * The repository abstract class for managing the connection to the db
 * In this case, I choose to use mongoose as an ORM
 */
export class RepositoryService<M, CreateInput, UpdateInput> {
  constructor(private readonly model: Model<M>) {}

  /**
   * Create the default options for encoding data
   * @param data The data for creating our model
   * @return The created document
   * */
  async create(data: CreateInput): Promise<M> {
    const obj: any = new this.model(data);
    return obj.save();
  }

  /**
   * Update the data of an element found by his id
   * @param _id The id of the element to update
   * @param data The new data to update with
   * @return The updated document
   * */
  async update(_id: string, data: UpdateInput): Promise<M> {
    return this.model.findByIdAndUpdate(_id, data, { new: true });
  }

  /**
   * Return one element by some conditions
   * @param find The condition to find the element
   * @return The found document
   * */
  async findOne<V>(find: V): Promise<M> {
    return this.model.findOne(find);
  }

  /**
   * Return all the document of the collection
   * @return The objects belonging to the collection
   * */
  async findAll(): Promise<M[]> {
    return this.model.find();
  }

  /**
   * Remove all the document of the collection
   * @return The removed document
   * */
  async removeAll(): Promise<M[]> {
    return this.model.remove();
  }

  /**
   * Return one document found by his id
   * @param _id The id of the document to find
   * @return The found document
   * */
  async findById(_id: string): Promise<M> {
    return this.model.findById(_id);
  }

  /**
   * Remove one document found by his id
   * @param _id The id of the document to remove
   * @return The removed document
   * */
  async removeById(_id: string): Promise<M> {
    return this.model.findByIdAndDelete(_id);
  }

  /**
   * Search if a document exist in the colection
   * @param find The condition of research
   * @return True if a document exist, or else false
   * */
  async exists<V>(find: V): Promise<boolean> {
    return this.model.exists(find);
  }
}
